import fetch from "node-fetch";
import Problem from "../models/Problem.model.js";

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const FALLBACK_MODELS = ["gemini-2.5-flash", "gemini-2.0-flash"];
const MAX_CODE_LENGTH = 20000;

const parseGeminiText = (data) => {
  const parts = data?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) {
    return "";
  }

  return parts
    .map((part) => part?.text)
    .filter(Boolean)
    .join("\n")
    .trim();
};

const parseFinishReason = (data) => data?.candidates?.[0]?.finishReason || "";

const extractComplexity = (answer, type) => {
  const regex = new RegExp(`\\*\\*${type} Complexity\\*\\*\\s*[:\\-]\\s*([^\\n]+)`, "i");
  const match = answer.match(regex);
  return match?.[1]?.trim() || "";
};

const shouldTryFallbackModel = (message) => {
  const normalized = (message || "").toLowerCase();
  return (
    normalized.includes("not found") ||
    normalized.includes("unsupported") ||
    normalized.includes("not available") ||
    normalized.includes("unknown model")
  );
};

const hasApiKeyError = (message) => (message || "").toLowerCase().includes("api key");
const hasQuotaError = (message) => {
  const normalized = (message || "").toLowerCase();
  return normalized.includes("quota") || normalized.includes("rate limit");
};

const validateCodeInput = ({ code, language }, res) => {
  const normalizedCode = String(code || "").trim();
  const normalizedLanguage = String(language || "auto").trim() || "auto";

  if (!normalizedCode) {
    res.status(400).json({
      success: false,
      message: "Code is required"
    });
    return null;
  }

  if (normalizedCode.length > MAX_CODE_LENGTH) {
    res.status(400).json({
      success: false,
      message: `Code is too long. Maximum supported length is ${MAX_CODE_LENGTH} characters.`
    });
    return null;
  }

  return {
    code: normalizedCode,
    language: normalizedLanguage
  };
};

const callGemini = async ({ apiKey, model, prompt }) => {
  const response = await fetch(
    `${GEMINI_API_BASE}/${encodeURIComponent(model)}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          topP: 0.95,
          maxOutputTokens: Number(process.env.GEMINI_MAX_OUTPUT_TOKENS || 8192)
        }
      })
    }
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const apiMessage = data?.error?.message || `Gemini request failed (${response.status})`;
    throw new Error(apiMessage);
  }

  const answer = parseGeminiText(data);
  if (!answer) {
    throw new Error("Gemini returned an empty response");
  }

  return {
    answer,
    finishReason: parseFinishReason(data)
  };
};

const continuePrompt = (partialAnswer) => `Continue the same answer from the exact stopping point.
Do not repeat sections that are already complete.
Return only the missing remaining content in markdown.

Current partial answer:
${partialAnswer}`;

const generateAnswerWithContinuation = async ({ apiKey, model, prompt }) => {
  const maxContinuationRounds = 2;
  let finalAnswer = "";
  let finishReason = "";
  let currentPrompt = prompt;

  for (let round = 0; round <= maxContinuationRounds; round += 1) {
    const response = await callGemini({ apiKey, model, prompt: currentPrompt });
    const chunk = response.answer.trim();

    finalAnswer = finalAnswer ? `${finalAnswer}\n\n${chunk}` : chunk;
    finishReason = response.finishReason;

    if (finishReason !== "MAX_TOKENS") {
      return {
        answer: finalAnswer,
        wasTruncated: false,
        usedContinuation: round > 0
      };
    }

    currentPrompt = continuePrompt(finalAnswer);
  }

  return {
    answer: finalAnswer,
    wasTruncated: true,
    usedContinuation: true
  };
};

const generateWithFallback = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key is not configured on the server");
  }

  const preferredModel = (process.env.GEMINI_MODEL || "").trim();
  const modelsToTry = [...new Set([preferredModel, ...FALLBACK_MODELS].filter(Boolean))];

  let answer = "";
  let modelUsed = "";
  let lastError = null;
  let wasTruncated = false;
  let usedContinuation = false;

  for (const model of modelsToTry) {
    try {
      const generated = await generateAnswerWithContinuation({ apiKey, model, prompt });
      answer = generated.answer;
      wasTruncated = generated.wasTruncated;
      usedContinuation = generated.usedContinuation;
      modelUsed = model;
      break;
    } catch (error) {
      lastError = error;
      if (!shouldTryFallbackModel(error.message)) {
        throw error;
      }
    }
  }

  if (!answer) {
    throw lastError || new Error("Unable to generate AI response");
  }

  return {
    answer,
    modelUsed,
    wasTruncated,
    usedContinuation
  };
};

const sendGeminiError = (res, error, fallbackMessage) => {
  const message = error.message || "";

  if (hasApiKeyError(message)) {
    return res.status(500).json({
      success: false,
      message: "Gemini API key is invalid or missing"
    });
  }

  if (hasQuotaError(message)) {
    return res.status(429).json({
      success: false,
      message: "AI request limit reached. Please try again in a few minutes."
    });
  }

  return res.status(500).json({
    success: false,
    message: fallbackMessage,
    error: error.message
  });
};

const buildLeetCodePrompt = (problemNumber) => `You are an expert coding instructor and interview mentor.

Analyze LeetCode problem #${problemNumber} and return an educational answer in markdown.
Use clear section headers exactly in this order:

1. Problem Overview
2. Key Insight
3. Step-by-Step Approach
4. Python Solution
5. JavaScript Solution
6. Complexity Analysis
7. Edge Cases
8. Practice Follow-ups

Rules:
- Keep explanations concise but clear for beginners.
- Include code blocks for Python and JavaScript.
- Mention time and space complexity explicitly.
- Keep the full answer under 1200 words.
`;

const buildComplexityPrompt = ({ language, code }) => `You are a senior software engineer and algorithms reviewer.

Analyze the following ${language} code and estimate complexity.

Code:
\`\`\`${language}
${code}
\`\`\`

Return markdown with exact sections:
1. Quick Summary
2. Time Complexity
3. Space Complexity
4. Complexity by Major Step (table)
5. Optimization Ideas
6. Final Complexity Verdict

Rules:
- Use Big-O notation.
- Explain best/average/worst if relevant.
- If code has branches with different complexity, explain each clearly.
- Keep under 900 words.
`;

const buildDebugPrompt = ({ language, code }) => `You are a strict code reviewer and debugger.

Review this ${language} code for syntax issues, logical bugs, runtime problems, and edge-case failures.

Code:
\`\`\`${language}
${code}
\`\`\`

Return markdown with exact sections:
1. Quick Assessment
2. Syntax or Compile Errors
3. Logical or Runtime Errors
4. Edge Cases That Fail
5. Fixed Code (same language)
6. Test Cases to Verify Fix

Rules:
- If there are no issues in a section, explicitly say "None found".
- In "Fixed Code", provide one corrected full code block.
- Keep it practical and precise.
- Keep under 1000 words.
`;

const buildOptimizationPrompt = ({ language, code }) => `You are an algorithms optimization mentor.

The user likely wrote a brute-force solution. Improve it to an optimal or near-optimal approach while keeping the same problem goal.

Original ${language} code:
\`\`\`${language}
${code}
\`\`\`

Return markdown with exact sections:
1. Current Approach Analysis
2. Bottlenecks in the Current Code
3. Optimized Strategy
4. Optimized Code (same language)
5. Complexity Comparison (table)
6. Why the New Version is Better

Rules:
- Provide one full improved code block in the same language.
- Mention any assumptions.
- Keep under 1000 words.
`;

export const getSolution = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const problem = await Problem.findOne({ _id: id, userId });
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found"
      });
    }

    return res.status(200).json({
      success: true,
      problem
    });
  } catch (error) {
    console.error("Get solution error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch solution",
      error: error.message
    });
  }
};

export const analyzeProblem = async (req, res) => {
  try {
    const { problemNumber } = req.body;
    const userId = req.user.userId;
    const normalizedProblemNumber = String(problemNumber || "").trim();

    if (!normalizedProblemNumber) {
      return res.status(400).json({
        success: false,
        message: "Problem number is required"
      });
    }

    if (!/^\d+$/.test(normalizedProblemNumber)) {
      return res.status(400).json({
        success: false,
        message: "Problem number must be numeric"
      });
    }

    const prompt = buildLeetCodePrompt(normalizedProblemNumber);
    const generated = await generateWithFallback(prompt);
    const answer = generated.answer;

    const savedProblem = await Problem.create({
      userId,
      problemNumber: normalizedProblemNumber,
      problemTitle: `LeetCode Problem #${normalizedProblemNumber}`,
      solution: answer,
      approach: "AI-generated solution",
      timeComplexity: extractComplexity(answer, "Time"),
      spaceComplexity: extractComplexity(answer, "Space")
    });

    return res.status(200).json({
      success: true,
      answer,
      modelUsed: generated.modelUsed,
      wasTruncated: generated.wasTruncated,
      usedContinuation: generated.usedContinuation,
      problemId: savedProblem._id,
      saved: true
    });
  } catch (error) {
    console.error("Analyze problem error:", error);
    return sendGeminiError(res, error, "Failed to analyze problem");
  }
};

export const analyzeCodeComplexity = async (req, res) => {
  try {
    const validated = validateCodeInput(req.body, res);
    if (!validated) {
      return;
    }

    const prompt = buildComplexityPrompt(validated);
    const generated = await generateWithFallback(prompt);

    return res.status(200).json({
      success: true,
      answer: generated.answer,
      modelUsed: generated.modelUsed,
      wasTruncated: generated.wasTruncated,
      usedContinuation: generated.usedContinuation
    });
  } catch (error) {
    console.error("Complexity analysis error:", error);
    return sendGeminiError(res, error, "Failed to analyze complexity");
  }
};

export const reviewCodeErrors = async (req, res) => {
  try {
    const validated = validateCodeInput(req.body, res);
    if (!validated) {
      return;
    }

    const prompt = buildDebugPrompt(validated);
    const generated = await generateWithFallback(prompt);

    return res.status(200).json({
      success: true,
      answer: generated.answer,
      modelUsed: generated.modelUsed,
      wasTruncated: generated.wasTruncated,
      usedContinuation: generated.usedContinuation
    });
  } catch (error) {
    console.error("Code review error:", error);
    return sendGeminiError(res, error, "Failed to review code");
  }
};

export const optimizeBruteForceCode = async (req, res) => {
  try {
    const validated = validateCodeInput(req.body, res);
    if (!validated) {
      return;
    }

    const prompt = buildOptimizationPrompt(validated);
    const generated = await generateWithFallback(prompt);

    return res.status(200).json({
      success: true,
      answer: generated.answer,
      modelUsed: generated.modelUsed,
      wasTruncated: generated.wasTruncated,
      usedContinuation: generated.usedContinuation
    });
  } catch (error) {
    console.error("Code optimization error:", error);
    return sendGeminiError(res, error, "Failed to optimize code");
  }
};

export const getProblemHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const history = await Problem.find({ userId })
      .sort({ createdAt: -1 })
      .limit(20)
      .select("_id problemNumber problemTitle createdAt");

    return res.status(200).json({
      success: true,
      history
    });
  } catch (error) {
    console.error("Get history error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load problem history",
      error: error.message
    });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.userId;
    const [solvedCount, latestProblem] = await Promise.all([
      Problem.countDocuments({ userId }),
      Problem.findOne({ userId }).sort({ createdAt: -1 }).select("_id problemNumber problemTitle createdAt")
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        solvedCount,
        latestProblem: latestProblem || null
      }
    });
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard stats",
      error: error.message
    });
  }
};

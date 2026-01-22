import { GoogleGenerativeAI } from "@google/generative-ai";

export const solveProblem = async (req, res) => {
  try {
    const problemNumber = req.params.id;

    if (!problemNumber) {
      return res.status(400).json({
        success: false,
        message: "Problem number is required",
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel(
      { model: "gemini-flash-latest" },
      { apiVersion: "v1beta" }
    );

    const prompt = `
      You are a DSA instructor.
      Explain LeetCode problem #${problemNumber} step by step.
      Use simple words.
      Explain approach first, then optimized solution.
      Mention time and space complexity.
      Do NOT copy the original problem statement.
    `;

    const result = await model.generateContent(prompt);
    const answer = result.response.text();

    res.status(200).json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Gemini API error",
      error: error.message,
    });
  }
};

export const analyzeCode = async (req, res) => {
  try {
    const { userCode, problemNumber } = req.body;

    if (!userCode) {
      return res.status(400).json({
        success: false,
        message: "Please provide your code analysis.",
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel(
      { model: "gemini-flash-latest" },
      { apiVersion: "v1beta" }
    );

    const prompt = `
      You are a Senior Code Reviewer.
      The user has written the following code for LeetCode Problem #${problemNumber || "Unknown"}:

      ${userCode}

      Please analyze it and return a JSON response with:
      1. Time Complexity
      2. Space Complexity
      3. A brief 2-line explanation of the logic.
      4. Suggest one improvement if possible.
    `;

    const result = await model.generateContent(prompt);
    const analysis = result.response.text();

    res.status(200).json({
      success: true,
      analysis,
    });

  } catch (error) {
    console.error("AI Analysis Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Analysis failed",
      error: error.message,
    });
  }
};
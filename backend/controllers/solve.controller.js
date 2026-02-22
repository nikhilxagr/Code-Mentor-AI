import { GoogleGenerativeAI } from "@google/generative-ai";
import Problem from "../models/Problem.model.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getSolution = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Fetch problem from DB
    const problem = await Problem.findOne({ _id: id, userId });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found"
      });
    }

    res.status(200).json({
      success: true,
      problem
    });

  } catch (error) {
    console.error('Get solution error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch solution",
      error: error.message
    });
  }
};

export const analyzeProblem = async (req, res) => {
  try {
    const { problemNumber } = req.body;
    const userId = req.user?.userId || null; // Allow without login for testing

    console.log('📥 Analyze request received:', { problemNumber, userId: userId || 'guest' });

    if (!problemNumber) {
      console.log('❌ Problem number missing');
      return res.status(400).json({
        success: false,
        message: "Problem number is required"
      });
    }

    // Check Gemini API key
    if (!process.env.GEMINI_API_KEY) {
      console.error('❌ GEMINI_API_KEY not found in environment');
      return res.status(500).json({
        success: false,
        message: "AI service not configured. Please contact administrator."
      });
    }

    // Create comprehensive AI prompt
    const prompt = `You are an expert coding instructor and competitive programming mentor. Analyze and solve LeetCode problem #${problemNumber}.

Please provide a detailed, well-structured solution with the following sections:

**1. Problem Title & Description**
- State the exact problem name
- Provide a clear, concise description of what the problem asks
- Include any constraints or special conditions

**2. Examples**
- Show 2-3 example inputs and their expected outputs
- Explain why each output is correct

**3. Intuition & Approach**
- Explain the thought process for solving this problem
- Describe the optimal approach/algorithm to use
- Mention any key insights or patterns

**4. Step-by-Step Solution**
- Break down the solution into clear, numbered steps
- Explain what each step accomplishes

**5. Code Implementation**
Provide clean, well-commented code in BOTH Python and JavaScript:

\`\`\`python
# Python solution with detailed comments
\`\`\`

\`\`\`javascript
// JavaScript solution with detailed comments
\`\`\`

**6. Complexity Analysis**
- **Time Complexity**: O(?) - Explain why
- **Space Complexity**: O(?) - Explain why

**7. Edge Cases & Considerations**
- List important edge cases to handle
- Mention any potential pitfalls

**8. Similar Problems**
- Suggest 2-3 similar LeetCode problems for practice

Format your response with clear markdown sections. Make it educational and easy to understand for learners.`;

    console.log(`🔍 Analyzing LeetCode Problem #${problemNumber}...`);

    // Call Gemini AI
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const answer = response.text();

      console.log(`✅ AI response generated (${answer.length} characters)`);

      // Save to DB only if user is logged in
      if (userId) {
        const savedProblem = await Problem.create({
          userId,
          problemNumber,
          problemTitle: `LeetCode Problem #${problemNumber}`,
          solution: answer,
          approach: "AI-generated optimal solution with detailed explanation",
          timeComplexity: "Extracted from AI response",
          spaceComplexity: "Extracted from AI response"
        });

        console.log(`💾 Solution saved to database with ID: ${savedProblem._id}`);

        return res.status(200).json({
          success: true,
          answer,
          problemId: savedProblem._id,
          saved: true
        });
      } else {
        // Guest user - don't save to database
        console.log(`👤 Guest user - solution not saved`);
        return res.status(200).json({
          success: true,
          answer,
          saved: false,
          message: "Solution generated (login to save)"
        });
      }

    } catch (aiError) {
      console.error('❌ AI generation error:', aiError);
      return res.status(500).json({
        success: false,
        message: `AI Error: ${aiError.message}. Please try again.`
      });
    }

  } catch (error) {
    console.error('❌ Analyze problem error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to analyze problem",
      error: error.message
    });
  }
};

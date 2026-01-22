import fetch from "node-fetch";

export const solveProblem = async (req, res) => {
  try {
    const { problemNumber } = req.body;

    const prompt = `
    Explain LeetCode problem ${problemNumber} with:
    - Step by step approach
    - Optimized solution
    - Time and Space complexity
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    res.json({
      success: true,
      answer: data.candidates[0].content.parts[0].text
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gemini API error",
      error: error.message
    });
  }
};

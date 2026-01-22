import { useState } from "react";

const ProblemSolver = () => {
  // -----------------------------
  // State for user input
  // -----------------------------
  const [problem, setProblem] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // State for AI response (dummy for now)
  // -----------------------------
  const [result, setResult] = useState(null);

  // -----------------------------
  // Handle form submission
  // -----------------------------
  const handleSolve = (e) => {
    e.preventDefault();

    // Basic validation
    if (!problem.trim()) {
      alert("Please enter a DSA problem");
      return;
    }

    setLoading(true);

    // Simulating AI response (later replaced by backend API)
    setTimeout(() => {
      setResult({
        approach:
          "We use a hash map to store visited elements and check if the required complement exists.",
        steps: [
          "Initialize an empty hash map",
          "Traverse the array",
          "Check if target - current element exists in map",
          "If yes, return indices",
          "Else, store element in map",
        ],
        code: `function twoSum(nums, target) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map[diff] !== undefined) {
      return [map[diff], i];
    }
    map[nums[i]] = i;
  }
}`,
        complexity: "Time: O(n), Space: O(n)",
      });

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Page Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          DSA Problem Solver 🤖
        </h1>

        {/* Input Section */}
        <form
          onSubmit={handleSolve}
          className="bg-white p-6 rounded-lg shadow mb-8"
        >
          {/* Problem Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paste your DSA problem
            </label>
            <textarea
              rows="6"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Example: Given an array of integers nums and an integer target..."
              className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Language Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded-md px-3 py-2"
            >
              <option>JavaScript</option>
              <option>Python</option>
              <option>Java</option>
              <option>C++</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Solve Problem"}
          </button>
        </form>

        {/* Output Section */}
        {result && (
          <div className="space-y-6">
            {/* Approach */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Approach</h2>
              <p className="text-gray-700">{result.approach}</p>
            </div>

            {/* Step-by-step Explanation */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">
                Step-by-step Explanation
              </h2>
              <ul className="list-disc list-inside text-gray-700">
                {result.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>

            {/* Code Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">
                Solution Code ({language})
              </h2>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                <code>{result.code}</code>
              </pre>
            </div>

            {/* Complexity */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">
                Time & Space Complexity
              </h2>
              <p className="text-gray-700">{result.complexity}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemSolver;

import { useState } from "react";
import Navbar from "../components/common/Navbar";
import ProblemForm from "../components/solver/ProblemForm";
import OutputSection from "../components/solver/OutputSection";

const ProblemSolver = () => {
  const [result, setResult] = useState(null);

  // Popular problem examples
  const popularProblems = [
    { number: "1", title: "Two Sum", difficulty: "Easy" },
    { number: "2", title: "Add Two Numbers", difficulty: "Medium" },
    { number: "15", title: "3Sum", difficulty: "Medium" },
    { number: "200", title: "Number of Islands", difficulty: "Medium" },
    { number: "206", title: "Reverse Linked List", difficulty: "Easy" },
    { number: "347", title: "Top K Frequent Elements", difficulty: "Medium" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              ✨ Powered by Google Gemini AI
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-4">
            AI Problem Solver 🤖
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Enter any LeetCode problem number and get instant, detailed explanations with 
            <span className="font-semibold text-indigo-600"> code examples, complexity analysis, and step-by-step breakdowns</span>
          </p>
        </div>

        {/* Input Form */}
        <ProblemForm setResult={setResult} />

        {/* Popular Problems Quick Access */}
        {!result && (
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              🔥 Try These Popular Problems
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {popularProblems.map((problem) => (
                <button
                  key={problem.number}
                  onClick={() => {
                    document.querySelector('input[type="text"]').value = problem.number;
                    document.querySelector('input[type="text"]').focus();
                  }}
                  className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105 border border-gray-200 hover:border-indigo-300 group"
                >
                  <div className="text-2xl font-bold text-indigo-600 mb-1">#{problem.number}</div>
                  <div className="text-xs text-gray-600 mb-2 truncate" title={problem.title}>
                    {problem.title}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {problem.difficulty}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Output */}
        {result && <OutputSection result={result} />}

        {/* Features Section */}
        {!result && (
          <div className="mt-10 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">💡 What You'll Get</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Problem Analysis</h4>
                <p className="text-sm text-gray-600">
                  Clear problem description, examples, and constraints explained in simple terms
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Optimal Solutions</h4>
                <p className="text-sm text-gray-600">
                  Multiple approaches with clean code in Python & JavaScript with detailed comments
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Complexity Analysis</h4>
                <p className="text-sm text-gray-600">
                  Time & space complexity breakdown with Big O notation and detailed explanations
                </p>
              </div>
            </div>

            {/* Additional Features */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4 items-start">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-1">Step-by-Step Breakdown</h5>
                    <p className="text-sm text-gray-600">Understand the logic with detailed step-by-step explanations</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-1">Edge Cases & Patterns</h5>
                    <p className="text-sm text-gray-600">Learn common edge cases and problem-solving patterns</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-1">Similar Problems</h5>
                    <p className="text-sm text-gray-600">Get suggestions for related problems to practice</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-1">Save & Revisit</h5>
                    <p className="text-sm text-gray-600">All solutions are automatically saved to your account</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProblemSolver;

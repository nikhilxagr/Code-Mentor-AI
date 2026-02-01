import { useState } from "react";
import api from "../../services/api";

const ProblemForm = ({ setResult }) => {
  const [problemNumber, setProblemNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!problemNumber.trim()) {
      alert("Please enter a problem number");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      console.log('Sending request to analyze problem:', problemNumber);
      
      // Call analyze endpoint with problem number
      const res = await api.post('/analyze', { 
        problemNumber: problemNumber.trim() 
      });
      
      console.log('Response received:', res.data);
      setResult(res.data);
    } catch (error) {
      console.error('Full error object:', error);
      console.error('Error response:', error.response);
      
      let errorMsg = "Something went wrong. Please try again.";
      
      if (error.response) {
        // Server responded with error
        errorMsg = error.response.data?.message || error.response.data?.error || errorMsg;
        console.error('Server error:', error.response.status, errorMsg);
      } else if (error.request) {
        // Request made but no response
        errorMsg = "Cannot connect to server. Please check if backend is running.";
        console.error('No response from server');
      } else {
        // Something else happened
        console.error('Request setup error:', error.message);
      }
      
      setResult({
        success: false,
        answer: errorMsg
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mb-10"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            🔢 LeetCode Problem Number
          </label>
          <input
            type="text"
            placeholder="e.g., 1, 2, 15, 200"
            value={problemNumber}
            onChange={(e) => setProblemNumber(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <p className="text-xs text-gray-500 mt-2">
            ✨ Enter any valid LeetCode problem number to get AI-powered explanation
          </p>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Solve Problem
              </span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProblemForm;

import { useState } from "react";
import problemService from "../../services/problemService";

const ProblemForm = ({ problemNumber, setProblemNumber, onSolved }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = problemNumber.trim();

    if (!trimmed) {
      onSolved({
        success: false,
        message: "Please enter a LeetCode problem number."
      });
      return;
    }

    setLoading(true);
    onSolved(null);

    try {
      const data = await problemService.analyze(trimmed);
      onSolved(data);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Could not generate a response. Check backend server and Gemini API key.";

      onSolved({
        success: false,
        message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-5 md:p-6">
      <label className="block text-sm font-semibold text-slate-700">LeetCode problem number</label>
      <div className="mt-3 flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          value={problemNumber}
          onChange={(event) => setProblemNumber(event.target.value)}
          inputMode="numeric"
          placeholder="e.g. 1, 15, 200, 347"
          className="pulse-border flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Analyzing..." : "Solve with AI"}
        </button>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        This endpoint is protected. You must stay logged in to call `/api/analyze`.
      </p>
    </form>
  );
};

export default ProblemForm;

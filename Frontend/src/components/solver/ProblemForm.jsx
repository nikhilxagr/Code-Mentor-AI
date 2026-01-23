import { useState } from "react";

const ProblemForm = ({ setResult }) => {
  const [problem, setProblem] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!problem.trim()) {
      alert("Please enter a problem");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/solve", {
        problem,
        language,
      });

      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow mb-10"
    >
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Paste your DSA problem
      </label>

      <textarea
        rows="6"
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        className="w-full border rounded-md p-3 mb-4 focus:ring-2 focus:ring-blue-500"
      />

      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Language
      </label>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="border rounded-md px-3 py-2 mb-4"
      >
        <option>JavaScript</option>
        <option>Python</option>
        <option>Java</option>
        <option>C++</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Solve Problem"}
      </button>
    </form>
  );
};

export default ProblemForm;

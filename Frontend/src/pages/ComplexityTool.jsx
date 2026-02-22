import { useState } from "react";
import Navbar from "../components/common/Navbar";
import CodeToolForm from "../components/tools/CodeToolForm";
import ToolResultCard from "../components/tools/ToolResultCard";
import problemService from "../services/problemService";

const ComplexityTool = () => {
  const [language, setLanguage] = useState("auto");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!code.trim()) {
      setResult({
        success: false,
        message: "Please paste code before running analysis."
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await problemService.analyzeComplexity({
        code: code.trim(),
        language
      });
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        message: error.response?.data?.message || "Failed to analyze complexity."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-6">
        <section className="mb-8 rounded-3xl border border-white/80 bg-gradient-to-r from-blue-700 via-cyan-700 to-teal-700 px-6 py-8 text-white shadow-xl md:px-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-100">Tool 1</p>
          <h1 className="mt-2 text-3xl font-bold md:text-5xl">Complexity Analyzer</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-cyan-50 md:text-base">
            This tool estimates time complexity and space complexity directly from your code. It also
            breaks down complexity by major steps and suggests optimization opportunities.
          </p>
        </section>

        <CodeToolForm
          title="Analyze Complexity"
          description="Paste code and get clear Big-O estimates for time and space with practical explanation."
          language={language}
          code={code}
          loading={loading}
          onLanguageChange={setLanguage}
          onCodeChange={setCode}
          onSubmit={handleSubmit}
          submitLabel="Analyze Complexity"
        />

        <ToolResultCard
          title="Complexity Report"
          subtitle="Understand where runtime and memory costs come from."
          result={result}
        />
      </main>
    </div>
  );
};

export default ComplexityTool;

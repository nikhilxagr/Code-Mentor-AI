import { useState } from "react";
import Navbar from "../components/common/Navbar";
import CodeToolForm from "../components/tools/CodeToolForm";
import ToolResultCard from "../components/tools/ToolResultCard";
import problemService from "../services/problemService";

const OptimizeTool = () => {
  const [language, setLanguage] = useState("auto");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!code.trim()) {
      setResult({
        success: false,
        message: "Please paste brute-force code before optimization."
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await problemService.optimizeCode({
        code: code.trim(),
        language
      });
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        message: error.response?.data?.message || "Failed to optimize code."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-6">
        <section className="mb-8 rounded-3xl border border-white/80 bg-gradient-to-r from-amber-700 via-orange-700 to-rose-700 px-6 py-8 text-white shadow-xl md:px-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-100">Tool 3</p>
          <h1 className="mt-2 text-3xl font-bold md:text-5xl">Brute Force Optimizer</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-orange-50 md:text-base">
            This tool upgrades brute-force code to a more optimal approach. It explains bottlenecks, gives
            optimized code, and compares old vs new complexity.
          </p>
        </section>

        <CodeToolForm
          title="Optimize Brute Force Code"
          description="Paste your current solution and receive a faster, cleaner version with comparison."
          language={language}
          code={code}
          loading={loading}
          onLanguageChange={setLanguage}
          onCodeChange={setCode}
          onSubmit={handleSubmit}
          submitLabel="Optimize Code"
        />

        <ToolResultCard
          title="Optimization Report"
          subtitle="Review bottlenecks and adopt the improved implementation."
          result={result}
        />
      </main>
    </div>
  );
};

export default OptimizeTool;

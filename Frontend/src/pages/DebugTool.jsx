import { useState } from "react";
import Navbar from "../components/common/Navbar";
import CodeToolForm from "../components/tools/CodeToolForm";
import ToolResultCard from "../components/tools/ToolResultCard";
import problemService from "../services/problemService";

const DebugTool = () => {
  const [language, setLanguage] = useState("auto");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!code.trim()) {
      setResult({
        success: false,
        message: "Please paste code before running review."
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await problemService.reviewCode({
        code: code.trim(),
        language
      });
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        message: error.response?.data?.message || "Failed to review code."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-6">
        <section className="mb-8 rounded-3xl border border-white/80 bg-gradient-to-r from-violet-700 via-indigo-700 to-blue-700 px-6 py-8 text-white shadow-xl md:px-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-100">Tool 2</p>
          <h1 className="mt-2 text-3xl font-bold md:text-5xl">Code Error Reviewer</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-indigo-50 md:text-base">
            This tool scans your code for syntax problems, logical bugs, runtime risks, and weak edge-case
            handling. It returns a structured report with a corrected version and test cases.
          </p>
        </section>

        <CodeToolForm
          title="Review Code For Errors"
          description="Paste code to receive practical debugging feedback with better formatting and fixed code."
          language={language}
          code={code}
          loading={loading}
          onLanguageChange={setLanguage}
          onCodeChange={setCode}
          onSubmit={handleSubmit}
          submitLabel="Find Errors"
        />

        <ToolResultCard
          title="Error Review Report"
          subtitle="Use this to fix correctness issues before optimization."
          result={result}
        />
      </main>
    </div>
  );
};

export default DebugTool;

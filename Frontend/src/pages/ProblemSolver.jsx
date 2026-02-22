import { useState } from "react";
import Navbar from "../components/common/Navbar";
import OutputSection from "../components/solver/OutputSection";
import ProblemForm from "../components/solver/ProblemForm";

const quickProblems = [
  { number: "1", title: "Two Sum", level: "Easy" },
  { number: "15", title: "3Sum", level: "Medium" },
  { number: "49", title: "Group Anagrams", level: "Medium" },
  { number: "206", title: "Reverse Linked List", level: "Easy" },
  { number: "347", title: "Top K Frequent Elements", level: "Medium" },
  { number: "42", title: "Trapping Rain Water", level: "Hard" }
];

const levelBadge = {
  Easy: "bg-emerald-100 text-emerald-700",
  Medium: "bg-amber-100 text-amber-700",
  Hard: "bg-rose-100 text-rose-700"
};

const ProblemSolver = () => {
  const [problemNumber, setProblemNumber] = useState("");
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-6">
        <section className="fade-slide mb-8 rounded-3xl border border-white/80 bg-gradient-to-r from-teal-700 via-teal-600 to-orange-500 px-6 py-8 text-white shadow-xl md:px-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-100">Protected AI Service</p>
          <h1 className="mt-2 text-3xl font-bold md:text-5xl">LeetCode Solver</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-teal-50 md:text-base">
            Submit a problem number to generate a structured solution with intuition, steps, code, and
            complexity analysis. Responses are saved to your account automatically.
          </p>
        </section>

        <ProblemForm problemNumber={problemNumber} setProblemNumber={setProblemNumber} onSolved={setResult} />

        {!result && (
          <section className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {quickProblems.map((problem) => (
              <button
                key={problem.number}
                type="button"
                onClick={() => setProblemNumber(problem.number)}
                className="glass-panel rounded-2xl p-4 text-left transition hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-slate-900">#{problem.number}</span>
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${levelBadge[problem.level]}`}>
                    {problem.level}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{problem.title}</p>
              </button>
            ))}
          </section>
        )}

        {result && <OutputSection result={result} />}
      </main>
    </div>
  );
};

export default ProblemSolver;

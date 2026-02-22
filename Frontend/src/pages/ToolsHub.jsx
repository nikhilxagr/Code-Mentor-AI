import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const tools = [
  {
    title: "Complexity Analyzer",
    description:
      "Paste any code and get estimated time and space complexity with step-wise breakdown.",
    to: "/tools/complexity",
    badge: "Time + Space"
  },
  {
    title: "Code Error Reviewer",
    description:
      "Paste code and get syntax, runtime, and logic issues with fixed code and test cases.",
    to: "/tools/debug",
    badge: "Find Errors"
  },
  {
    title: "Brute Force Optimizer",
    description:
      "Paste brute-force code and get an optimized approach, improved implementation, and comparison.",
    to: "/tools/optimize",
    badge: "Optimize"
  }
];

const ToolsHub = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-6">
        <section className="fade-slide mb-8 rounded-3xl border border-white/80 bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-600 px-6 py-8 text-white shadow-xl md:px-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-100">Developer Tools</p>
          <h1 className="mt-2 text-3xl font-bold md:text-5xl">AI Code Toolkit</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-emerald-50 md:text-base">
            Three focused tools powered by Gemini: complexity estimation, bug review, and brute-force
            optimization. Choose one and paste your code.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {tools.map((tool) => (
            <article key={tool.title} className="glass-panel rounded-3xl p-6">
              <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
                {tool.badge}
              </span>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">{tool.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{tool.description}</p>
              <Link
                to={tool.to}
                className="mt-6 inline-flex rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-600"
              >
                Open Tool
              </Link>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ToolsHub;

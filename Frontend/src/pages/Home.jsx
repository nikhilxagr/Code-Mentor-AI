import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import useAuth from "../hooks/useAuth";

const unifiedFeatures = [
  {
    title: "Solve Problems",
    description: "LeetCode solutions with direct answer first, then compact explanation.",
    to: "/solve"
  },
  {
    title: "Analyze Complexity",
    description: "Get Time and Space complexity first, followed by short reasoning.",
    to: "/tools/complexity"
  },
  {
    title: "Debug Code",
    description: "See error verdict first, corrected code first, then concise issue list.",
    to: "/tools/debug"
  },
  {
    title: "Optimize Code",
    description: "Check if code is already optimal; otherwise get best copy-paste code first.",
    to: "/tools/optimize"
  }
];

const Home = () => {
  const { isAuthenticated } = useAuth();
  const defaultCta = isAuthenticated ? "/tools" : "/signup";

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-6">
        <section className="glass-panel fade-slide rounded-3xl px-6 py-10 md:px-12 md:py-14">
          <p className="mb-4 inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
            One AI Tool for DSA and code quality
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            CodeMentor AI <span className="headline-gradient">Unified Toolkit</span>
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            Solve, debug, optimize, and analyze complexity in one place. Every response is tuned to show
            the result first and keep explanations short and practical.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={defaultCta}
              className="rounded-xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-900/20 transition hover:-translate-y-0.5 hover:bg-teal-600"
            >
              {isAuthenticated ? "Open Unified Toolkit" : "Create Free Account"}
            </Link>
            <Link
              to={isAuthenticated ? "/dashboard" : "/login"}
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
            >
              {isAuthenticated ? "Open Dashboard" : "Login"}
            </Link>
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          {unifiedFeatures.map((feature) => (
            <article key={feature.title} className="glass-panel rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-slate-800">{feature.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{feature.description}</p>
              <Link
                to={isAuthenticated ? feature.to : "/login"}
                className="mt-4 inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
              >
                Try This
              </Link>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white/80 px-6 py-8">
          <h2 className="text-2xl font-semibold text-slate-900">Developed by</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <a
              href="https://ggauravky.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-4 transition hover:border-teal-300"
            >
              <p className="text-sm font-semibold text-slate-900">Gaurav Kumar Yadav</p>
              <p className="mt-1 text-xs text-teal-700">Portfolio</p>
            </a>
            <a
              href="https://nikhilxagr.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-4 transition hover:border-teal-300"
            >
              <p className="text-sm font-semibold text-slate-900">Nikhil Agrahari</p>
              <p className="mt-1 text-xs text-teal-700">Portfolio</p>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

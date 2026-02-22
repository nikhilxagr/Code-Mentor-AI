import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import useAuth from "../hooks/useAuth";

const features = [
  {
    title: "Concept-first explanations",
    description:
      "Each response teaches intuition first, then implementation, so you can solve similar problems on your own."
  },
  {
    title: "Fast interview prep loop",
    description:
      "Pick a LeetCode number, get a structured breakdown, and practice follow-ups in one focused flow."
  },
  {
    title: "Your personal history",
    description:
      "Saved responses and dashboard stats help you track volume and revisit what you solved recently."
  }
];

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-6">
        <section className="glass-panel fade-slide rounded-3xl px-6 py-10 md:px-12 md:py-14">
          <p className="mb-4 inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
            AI DSA mentor for daily practice
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Learn problem solving with <span className="headline-gradient">clear AI guidance</span>
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            CodeMentor AI connects your login, solver, and progress in one place. Ask for any LeetCode
            problem by number and get an explanation you can study, run, and revisit.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={isAuthenticated ? "/solve" : "/signup"}
              className="rounded-xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-900/20 transition hover:-translate-y-0.5 hover:bg-teal-600"
            >
              {isAuthenticated ? "Go to Solver" : "Create Free Account"}
            </Link>
            <Link
              to={isAuthenticated ? "/dashboard" : "/login"}
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
            >
              {isAuthenticated ? "Open Dashboard" : "Login"}
            </Link>
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="glass-panel rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-slate-800">{feature.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{feature.description}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home;

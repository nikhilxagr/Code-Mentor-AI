import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import useAuth from "../hooks/useAuth";
import problemService from "../services/problemService";

const formatDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    solvedCount: 0,
    latestProblem: null
  });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      setLoading(true);
      setError("");

      try {
        const [statsData, historyData] = await Promise.all([
          problemService.getStats(),
          problemService.getHistory()
        ]);

        if (!active) return;

        setStats(
          statsData?.stats || {
            solvedCount: 0,
            latestProblem: null
          }
        );
        setHistory(historyData?.history || []);
      } catch (apiError) {
        if (!active) return;
        setError(apiError.response?.data?.message || "Failed to load dashboard data.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadDashboard();
    return () => {
      active = false;
    };
  }, []);

  const latestSolvedText = useMemo(() => {
    if (!stats.latestProblem) {
      return "No solved problems yet";
    }
    return `#${stats.latestProblem.problemNumber} on ${formatDate(stats.latestProblem.createdAt)}`;
  }, [stats.latestProblem]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-6">
        <section className="glass-panel rounded-3xl p-6 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-5xl">
            Welcome, {user?.name || "Learner"}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            Your stats come directly from backend protected endpoints so you can track real usage and
            revisit generated solutions quickly.
          </p>
          <div className="mt-6">
            <div className="flex flex-wrap gap-3">
              <Link
                to="/solve"
                className="inline-flex rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-600"
              >
                Solve another problem
              </Link>
              <Link
                to="/tools"
                className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
              >
                Open AI Tools
              </Link>
            </div>
          </div>
        </section>

        {error && (
          <section className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {error}
          </section>
        )}

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="glass-panel rounded-2xl p-5">
            <p className="text-sm font-semibold text-slate-600">Problems solved</p>
            <p className="mt-2 text-4xl font-bold text-slate-900">{loading ? "..." : stats.solvedCount}</p>
          </article>
          <article className="glass-panel rounded-2xl p-5">
            <p className="text-sm font-semibold text-slate-600">Latest solved</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{loading ? "Loading..." : latestSolvedText}</p>
          </article>
          <article className="glass-panel rounded-2xl p-5">
            <p className="text-sm font-semibold text-slate-600">Account email</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{user?.email || "N/A"}</p>
          </article>
        </section>

        <section className="mt-6 glass-panel rounded-3xl p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Recent AI solutions</h2>
          <p className="mt-1 text-sm text-slate-600">Last 20 saved responses from your account.</p>

          {loading && <p className="mt-4 text-sm text-slate-600">Loading history...</p>}

          {!loading && history.length === 0 && (
            <p className="mt-4 text-sm text-slate-600">
              No history yet. Start with one problem in the solver page.
            </p>
          )}

          {!loading && history.length > 0 && (
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 bg-white">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Problem
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {history.map((item) => (
                    <tr key={item._id}>
                      <td className="px-4 py-3 text-sm font-semibold text-teal-700">#{item.problemNumber}</td>
                      <td className="px-4 py-3 text-sm text-slate-700">{item.problemTitle}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{formatDate(item.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

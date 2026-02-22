import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const NotFound = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto flex max-w-4xl items-center px-4 py-14 md:px-6">
        <section className="glass-panel w-full rounded-3xl p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">404</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900 md:text-6xl">Page not found</h1>
          <p className="mx-auto mt-4 max-w-lg text-sm text-slate-600 md:text-base">
            The page you requested does not exist. Use the dashboard or solver links below to continue.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-400 hover:text-teal-700"
            >
              Go home
            </Link>
            <Link
              to="/dashboard"
              className="rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-600"
            >
              Open dashboard
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NotFound;

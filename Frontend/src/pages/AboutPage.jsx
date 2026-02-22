import Navbar from "../components/common/Navbar";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6">
        <section className="glass-panel rounded-3xl px-6 py-10 md:px-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">About</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900 md:text-5xl">About CodeMentor AI</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
            CodeMentor AI is a unified coding helper for interview prep and DSA practice. The platform is
            built to provide quick result-first answers and keep explanations short and practical.
          </p>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="glass-panel rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-slate-900">Result First</h2>
            <p className="mt-2 text-sm text-slate-600">
              Tool responses prioritize final output first, then supporting explanation.
            </p>
          </article>
          <article className="glass-panel rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-slate-900">Practical Output</h2>
            <p className="mt-2 text-sm text-slate-600">
              Responses focus on code you can copy, run, and verify quickly.
            </p>
          </article>
          <article className="glass-panel rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-slate-900">Unified Flow</h2>
            <p className="mt-2 text-sm text-slate-600">
              Solve, debug, optimize, and check complexity from a single toolkit.
            </p>
          </article>
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white/80 px-6 py-8">
          <h2 className="text-2xl font-semibold text-slate-900">Developers</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <a
              href="https://ggauravky.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-4 transition hover:border-teal-300"
            >
              <p className="text-sm font-semibold text-slate-900">Gaurav Kumar Yadav</p>
              <p className="mt-1 text-xs text-slate-500">Portfolio: ggauravky.vercel.app</p>
            </a>
            <a
              href="https://nikhilxagr.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-4 transition hover:border-teal-300"
            >
              <p className="text-sm font-semibold text-slate-900">Nikhil Agrahari</p>
              <p className="mt-1 text-xs text-slate-500">Portfolio: nikhilxagr.vercel.app</p>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;

import Navbar from "../components/common/Navbar";

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6">
        <section className="glass-panel rounded-3xl px-6 py-10 md:px-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">Contact</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900 md:text-5xl">Get in Touch</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
            Reach out to the developers for feedback, collaboration, and feature requests.
          </p>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="glass-panel rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-slate-900">Gaurav Kumar Yadav</h2>
            <p className="mt-2 text-sm text-slate-600">Full Stack Developer</p>
            <a
              href="https://ggauravky.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-600"
            >
              Open Portfolio
            </a>
          </article>

          <article className="glass-panel rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-slate-900">Nikhil Agrahari</h2>
            <p className="mt-2 text-sm text-slate-600">Full Stack Developer</p>
            <a
              href="https://nikhilxagr.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-600"
            >
              Open Portfolio
            </a>
          </article>
        </section>
      </main>
    </div>
  );
};

export default ContactPage;

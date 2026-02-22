const languageOptions = [
  { label: "Auto Detect", value: "auto" },
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
  { label: "C", value: "c" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" }
];

const CodeToolForm = ({
  title,
  description,
  language,
  code,
  loading,
  onLanguageChange,
  onCodeChange,
  onSubmit,
  submitLabel
}) => {
  return (
    <section className="glass-panel rounded-3xl p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <div className="grid gap-4 md:grid-cols-[220px_1fr]">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-700">Language</span>
            <select
              value={language}
              onChange={(event) => onLanguageChange(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            >
              {languageOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <div className="rounded-xl border border-teal-100 bg-teal-50 px-4 py-3 text-sm text-teal-800">
            Paste code only. No screenshots. Include the full function/class for best results.
          </div>
        </div>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-slate-700">Code</span>
          <textarea
            value={code}
            onChange={(event) => onCodeChange(event.target.value)}
            placeholder="Paste your code here..."
            className="min-h-[320px] w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-mono text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
          />
        </label>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-500">Max 20,000 characters per request.</p>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Running..." : submitLabel}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CodeToolForm;

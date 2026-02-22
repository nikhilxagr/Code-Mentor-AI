import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const extractQuickResult = (markdown) => {
  const lines = String(markdown || "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  for (const rawLine of lines) {
    if (rawLine.startsWith("```")) {
      continue;
    }

    const cleanLine = rawLine
      .replace(/^#{1,6}\s*/, "")
      .replace(/^\d+\.\s*/, "")
      .replace(/^[-*]\s*/, "")
      .replace(/\*\*/g, "")
      .replace(/`/g, "")
      .trim();

    if (!cleanLine) {
      continue;
    }

    return cleanLine.length > 220 ? `${cleanLine.slice(0, 217)}...` : cleanLine;
  }

  return "Result ready.";
};

const normalizeMarkdown = (input) => {
  let text = String(input || "").replace(/\r\n/g, "\n").trim();

  if (!text) {
    return "";
  }

  // Fix malformed list items where model outputs:
  // *
  // `item`
  text = text.replace(/(^|\n)([*-])\s*\n(?=`)/g, "$1$2 ");

  // Convert bare language lines into fenced blocks when model omits backticks.
  text = text.replace(/(^|\n)python\s*\n(?=class|def|from|import)/gi, "$1```python\n");
  text = text.replace(
    /(^|\n)javascript\s*\n(?=\/\*\*|var |const |let |function)/gi,
    "$1```javascript\n"
  );

  const fenceCount = (text.match(/```/g) || []).length;
  if (fenceCount % 2 !== 0) {
    text = `${text}\n\`\`\``;
  }

  return text;
};

const markdownComponents = {
  h1: ({ children }) => <h1 className="mt-6 text-3xl font-bold text-slate-900">{children}</h1>,
  h2: ({ children }) => <h2 className="mt-6 text-2xl font-semibold text-slate-900">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-5 text-xl font-semibold text-slate-900">{children}</h3>,
  h4: ({ children }) => <h4 className="mt-4 text-lg font-semibold text-slate-900">{children}</h4>,
  p: ({ children }) => <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base">{children}</p>,
  ul: ({ children }) => <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">{children}</ul>,
  ol: ({ children }) => <ol className="mt-3 list-decimal space-y-2 pl-6 text-slate-700">{children}</ol>,
  li: ({ children }) => <li className="leading-7">{children}</li>,
  hr: () => <hr className="my-6 border-slate-200" />,
  blockquote: ({ children }) => (
    <blockquote className="mt-4 border-l-4 border-teal-400 bg-teal-50 px-4 py-3 text-slate-700">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-semibold text-teal-700 underline decoration-teal-300 underline-offset-2 hover:text-teal-600"
    >
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 bg-white">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-slate-50">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-y divide-slate-100">{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => (
    <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">{children}</th>
  ),
  td: ({ children }) => <td className="px-4 py-2 text-sm text-slate-700">{children}</td>,
  code: ({ inline, className, children }) => {
    if (inline) {
      return <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">{children}</code>;
    }

    const language = className?.replace("language-", "") || "code";
    return (
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
        <div className="border-b border-slate-800 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
          {language}
        </div>
        <pre className="overflow-x-auto p-4 text-sm text-teal-200">
          <code>{children}</code>
        </pre>
      </div>
    );
  }
};

const OutputSection = ({ result }) => {
  if (!result) {
    return null;
  }

  if (!result.success) {
    return (
      <section className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-5">
        <h2 className="text-lg font-semibold text-rose-700">Request failed</h2>
        <p className="mt-2 text-sm text-rose-700">
          {result.message || result.answer || "Unable to fetch solution."}
        </p>
      </section>
    );
  }

  const content = result.answer || "";
  const normalizedContent = normalizeMarkdown(content);
  const quickResult = extractQuickResult(normalizedContent);

  return (
    <section className="mt-8 space-y-4">
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">Response generated</span>
        {result.saved && <span className="rounded-full bg-teal-100 px-3 py-1 text-teal-700">Saved to account</span>}
        {result.modelUsed && (
          <span className="rounded-full bg-slate-200 px-3 py-1 text-slate-700">Model: {result.modelUsed}</span>
        )}
        {result.usedContinuation && (
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-indigo-700">Auto-continued</span>
        )}
      </div>

      {result.wasTruncated && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Response hit model length limits. The backend continued automatically, but a small tail may still be
          missing.
        </div>
      )}

      <article className="glass-panel rounded-3xl p-5 md:p-8">
        <header className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-semibold text-slate-900">AI Solution</h2>
          <p className="mt-1 text-sm text-slate-600">
            Review the explanation, then code it yourself before copying final implementation.
          </p>
        </header>

        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Quick Result</p>
          <p className="mt-1 text-sm font-semibold text-emerald-900">{quickResult}</p>
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white px-4 py-2 md:px-6 md:py-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {normalizedContent}
          </ReactMarkdown>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-200 pt-4">
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(content)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-400 hover:text-teal-700"
          >
            Copy response
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-400 hover:text-teal-700"
          >
            Print
          </button>
        </div>
      </article>
    </section>
  );
};

export default OutputSection;

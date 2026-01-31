const OutputSection = ({ result }) => {
  // Error state
  if (!result?.success) {
    return (
      <div className="bg-red-50 border border-red-200 p-6 rounded-2xl shadow-lg animate-fadeIn">
        <div className="flex items-center gap-3 mb-3">
          <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <h3 className="text-lg font-semibold text-red-700">Error</h3>
        </div>
        <p className="text-red-600">{result?.answer || "Failed to get solution. Please try again."}</p>
      </div>
    );
  }

  // Format the AI response with better styling
  const formatSolution = (text) => {
    if (!text) return null;
    
    // Split by common section headers and format
    const lines = text.split('\n');
    const formattedLines = [];
    
    lines.forEach((line, index) => {
      // Bold section headers
      if (line.match(/^\*\*.*\*\*:?$/)) {
        formattedLines.push(
          <div key={index} className="font-bold text-xl text-indigo-700 mt-6 mb-3 border-b-2 border-indigo-200 pb-2">
            {line.replace(/\*\*/g, '')}
          </div>
        );
      }
      // Code blocks
      else if (line.match(/^```/)) {
        const codeBlock = [];
        let i = index + 1;
        while (i < lines.length && !lines[i].match(/^```/)) {
          codeBlock.push(lines[i]);
          i++;
        }
        if (codeBlock.length > 0) {
          formattedLines.push(
            <div key={index} className="bg-gray-900 text-green-400 p-4 rounded-lg my-4 overflow-x-auto">
              <pre className="text-sm font-mono">
                <code>{codeBlock.join('\n')}</code>
              </pre>
            </div>
          );
        }
      }
      // Numbered lists
      else if (line.match(/^\d+\./)) {
        formattedLines.push(
          <div key={index} className="ml-4 my-2 flex gap-3">
            <span className="text-blue-600 font-semibold">{line.match(/^\d+\./)[0]}</span>
            <span className="text-gray-700">{line.replace(/^\d+\./, '').trim()}</span>
          </div>
        );
      }
      // Bullet points
      else if (line.match(/^[-•*]/)) {
        formattedLines.push(
          <div key={index} className="ml-4 my-2 flex gap-3">
            <span className="text-indigo-500">•</span>
            <span className="text-gray-700">{line.replace(/^[-•*]/, '').trim()}</span>
          </div>
        );
      }
      // Complexity notations
      else if (line.match(/O\(.+\)/)) {
        formattedLines.push(
          <div key={index} className="bg-purple-50 border-l-4 border-purple-500 p-3 my-2 rounded">
            <span className="text-purple-800 font-mono font-semibold">{line}</span>
          </div>
        );
      }
      // Regular paragraphs
      else if (line.trim()) {
        formattedLines.push(
          <p key={index} className="text-gray-700 my-2 leading-relaxed">{line}</p>
        );
      }
      // Empty lines for spacing
      else {
        formattedLines.push(<div key={index} className="h-2" />);
      }
    });

    return formattedLines;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Success Badge */}
      <div className="flex items-center gap-2 text-green-600">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="font-semibold">✨ Solution Generated Successfully!</span>
      </div>

      {/* Solution Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Problem Solution & Explanation
              </h2>
              <p className="text-blue-100 mt-2">AI-powered analysis using Google Gemini Pro</p>
            </div>
            {result.saved && (
              <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                </svg>
                <span className="text-sm font-semibold">Saved</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="prose prose-lg max-w-none">
            {formatSolution(result.answer)}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(result.answer);
                alert('Solution copied to clipboard!');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">Copy Solution</span>
            </button>
            
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">Print</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-xl">
        <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          💡 Pro Tips for Learning
        </h4>
        <ul className="text-blue-700 text-sm space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Try implementing this solution yourself before looking at the code</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Understand the time and space complexity trade-offs</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Practice similar problems to reinforce the pattern</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OutputSection;

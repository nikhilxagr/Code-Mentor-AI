const CodeCard = ({ code }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-2">Solution Code</h2>
    <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
      <code>{code}</code>
    </pre>
  </div>
);

export default CodeCard;

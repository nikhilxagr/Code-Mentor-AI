const ComplexityCard = ({ complexity }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-2">Time & Space Complexity</h2>
    <p className="text-gray-700">{complexity}</p>
  </div>
);

export default ComplexityCard;

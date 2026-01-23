const StepsCard = ({ steps }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-2">Step-by-step Explanation</h2>
    <ul className="list-disc list-inside text-gray-700">
      {steps.map((step, i) => (
        <li key={i}>{step}</li>
      ))}
    </ul>
  </div>
);

export default StepsCard;

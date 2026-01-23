import { useState } from "react";
import Navbar from "../components/common/Navbar";

import ProblemForm from "../components/solver/ProblemForm";
import OutputSection from "../components/solver/OutputSection";

const ProblemSolver = () => {
  // Holds AI result (null initially)
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          DSA Problem Solver 🤖
        </h1>

        {/* Input Form */}
        <ProblemForm setResult={setResult} />

        {/* Output */}
        {result && <OutputSection result={result} />}
      </main>
    </div>
  );
};

export default ProblemSolver;

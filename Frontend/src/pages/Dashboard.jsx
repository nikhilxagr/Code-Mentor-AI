import Navbar from "../components/common/Navbar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <Navbar />

    
      <main className="max-w-7xl mx-auto px-6 py-10">
      
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome 👋</h2>
          <p className="text-gray-600">
            Ready to improve your DSA problem-solving skills today?
          </p>
        </section>

        {/* Action Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Solve Problem Card */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-2">Solve a DSA Problem</h3>
            <p className="text-sm text-gray-600 mb-4">
              Paste a DSA problem and get a step-by-step explanation.
            </p>
            <Link
              to="/solve"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Start Solving
            </Link>
          </div>

          {/* Coming Soon Cards */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Learn DSA Concepts</h3>
            <p className="text-sm text-gray-600">
              Beginner-friendly explanations (Coming Soon).
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
            <p className="text-sm text-gray-600">
              Monitor your learning journey (Coming Soon).
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

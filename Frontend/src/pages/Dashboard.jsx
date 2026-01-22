import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">CodeMentor AI</h1>

        <button className="text-sm text-red-500 hover:underline">Logout</button>
      </nav>

      {/* Main Dashboard Content */}
      <main className="px-6 py-10 max-w-6xl mx-auto">
        {/* Welcome Section */}
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
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Solve a DSA Problem
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Paste a DSA problem and get a step-by-step explanation with an
              optimized solution.
            </p>
            <Link
              to="/solve"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Start Solving
            </Link>
          </div>

          {/* Learn DSA Card */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Learn DSA Concepts
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Strengthen your fundamentals with beginner-friendly explanations.
            </p>
            <button className="inline-block border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">
              Coming Soon
            </button>
          </div>

          {/* Progress Card */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Track Your Progress
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              View solved problems and monitor your learning journey.
            </p>
            <button className="inline-block border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">
              Coming Soon
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

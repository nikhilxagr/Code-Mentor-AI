import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar Section */}
      <nav className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">CodeMentor AI</h1>

        <div className="space-x-4">
          <button className="text-gray-600 hover:text-blue-600">Login</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Learn DSA the Right Way
          </h2>

          <p className="text-gray-600 text-lg mb-6">
            CodeMentor AI helps beginners understand{" "}
            <span className="font-semibold">how to think</span>
            while solving DSA problems — not just copy solutions.
          </p>

          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700">
              Get Started
            </button>

            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md text-lg hover:bg-blue-50">
              Learn More
            </button>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-white text-center py-4 text-sm text-gray-500">
        © 2026 CodeMentor AI. Built for beginners.
      </footer>
    </div>
  );
};

export default Home;

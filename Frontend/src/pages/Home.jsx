import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";


const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/*  NAVBAR  */}
      <header className="bg-white border-b">
        <Navbar />
      </header>

      {/*  HERO SECTION  */}
      <main>
        <section className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Learn DSA the <span className="text-blue-600">Right Way</span>
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10">
            CodeMentor AI helps beginners understand how to{" "}
            <span className="font-semibold text-gray-800">think logically</span>{" "}
            while solving DSA problems — not just copy solutions.
          </p>

          <div className="flex justify-center gap-5">
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
            >
              Get Started 🚀
            </Link>
            <Link
              to="/login"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg hover:bg-blue-50 transition"
            >
              Learn More
            </Link>
          </div>
        </section>

        {/*  FEATURES SECTION  */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why CodeMentor AI?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-50 p-8 rounded-xl border hover:shadow-md transition">
                <h4 className="text-xl font-semibold mb-3">
                  🧠 Clear Problem Approach
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Understand the exact mindset required to solve DSA problems
                  step by step, just like an experienced mentor.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-50 p-8 rounded-xl border hover:shadow-md transition">
                <h4 className="text-xl font-semibold mb-3">
                  📘 Beginner-Friendly Explanations
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Explanations designed specifically for freshers and
                  early-stage developers, with no unnecessary jargon.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-50 p-8 rounded-xl border hover:shadow-md transition">
                <h4 className="text-xl font-semibold mb-3">
                  ⚡ Faster Interview Prep
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Focus on logic and patterns so you can prepare smarter and
                  faster for coding interviews.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/*  CALL TO ACTION  */}
        <section className="bg-blue-600 py-20 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to start your DSA journey?
          </h3>
          <p className="text-blue-100 mb-8">
            Join CodeMentor AI and learn problem-solving the right way.
          </p>
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Create Free Account
          </Link>
        </section>
      </main>

      {/*  FOOTER  */}
      <footer className="bg-white border-t py-4 text-center text-sm text-gray-500">
        © 2026 CodeMentor AI · Built for beginners
      </footer>
    </div>
  );
};

export default Home;

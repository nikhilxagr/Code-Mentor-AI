import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-white p-2 rounded-lg">
                <svg
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <span className="text-white text-xl font-bold">
                DSA Mentor AI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/practice"
              className="text-white hover:text-indigo-200 transition-colors duration-200 font-medium"
            >
              Practice
            </Link>
            <Link
              to="/tutorials"
              className="text-white hover:text-indigo-200 transition-colors duration-200 font-medium"
            >
              Tutorials
            </Link>
            <Link
              to="/challenges"
              className="text-white hover:text-indigo-200 transition-colors duration-200 font-medium"
            >
              Challenges
            </Link>
            <Link
              to="/leaderboard"
              className="text-white hover:text-indigo-200 transition-colors duration-200 font-medium"
            >
              Leaderboard
            </Link>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="text-white hover:text-indigo-200 transition-colors duration-200 font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-indigo-200 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/practice"
              className="block px-3 py-2 text-white hover:bg-indigo-600 rounded-md transition-colors duration-200"
            >
              Practice
            </Link>
            <Link
              to="/tutorials"
              className="block px-3 py-2 text-white hover:bg-indigo-600 rounded-md transition-colors duration-200"
            >
              Tutorials
            </Link>
            <Link
              to="/challenges"
              className="block px-3 py-2 text-white hover:bg-indigo-600 rounded-md transition-colors duration-200"
            >
              Challenges
            </Link>
            <Link
              to="/leaderboard"
              className="block px-3 py-2 text-white hover:bg-indigo-600 rounded-md transition-colors duration-200"
            >
              Leaderboard
            </Link>
            <div className="border-t border-indigo-600 my-2"></div>
            <Link
              to="/login"
              className="block px-3 py-2 text-white hover:bg-indigo-600 rounded-md transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block px-3 py-2 bg-white text-indigo-600 rounded-md font-medium hover:bg-indigo-50 transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

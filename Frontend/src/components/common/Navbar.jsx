import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-blue-600">
          CodeMentor AI
        </Link>

        <nav className="flex gap-4 items-center">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      {/* 404 Heading */}
      <h1 className="text-7xl font-extrabold text-blue-600 mb-4">404</h1>

      {/* Message */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-600 max-w-md mb-6">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;

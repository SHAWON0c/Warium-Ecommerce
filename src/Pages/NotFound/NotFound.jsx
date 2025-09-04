import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTools } from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();

  // Redirect after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // redirect to homepage
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 text-gray-800 px-4">
      <div className="flex items-center space-x-4">
        <FaTools className="text-6xl text-yellow-600 animate-bounce" />
        <h1 className="text-4xl sm:text-5xl font-bold">🚧 Under Construction</h1>
      </div>
      <p className="text-lg mt-4 text-gray-700">
        We are building this page. You will be redirected shortly.
      </p>

      {/* Optional progress bar */}
      <div className="w-full max-w-md mt-8 bg-gray-300 rounded-full h-4 overflow-hidden">
        <div className="h-4 bg-yellow-600 animate-loadingBar"></div>
      </div>

      <p className="text-sm mt-2 text-gray-500">Redirecting to homepage in 5 seconds...</p>

      {/* Custom animation */}
      <style>
        {`
          @keyframes loadingBar {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          .animate-loadingBar {
            animation: loadingBar 5s linear forwards;
          }
        `}
      </style>
    </div>
  );
};

export default NotFound;

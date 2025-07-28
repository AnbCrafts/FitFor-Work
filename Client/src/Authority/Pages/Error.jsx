import React from "react";
import { AlertTriangle, ArrowLeftCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const Error = () => {
    const {hash} = useParams();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center px-4 absolute top-0 w-full z-20">
      <div className="flex flex-col items-center text-center">
        <AlertTriangle className="w-20 h-20 text-red-500 mb-6 animate-pulse" />
        <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-400 max-w-md mb-8">
          The page you are looking for doesn't exist or has been moved. Please check the URL or return to the homepage.
        </p>
        <Link
          to={`/auth/authority/${hash}`}
          className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full transition duration-300"
        >
          <ArrowLeftCircle className="w-5 h-5" />
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default Error;

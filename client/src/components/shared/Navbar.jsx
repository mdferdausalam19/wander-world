import { useState } from "react";
import { Link } from "react-router";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">
                WanderWorld
              </span>
            </Link>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="ml-4 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-500 font-medium"
            >
              Home
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Sign Out
                </button>
              </div>
            </div>
            <>
              <Link
                to="/sign-in"
                className="text-gray-700 hover:text-blue-500 px-4 py-2 text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-full text-sm font-medium"
              >
                Sign Up
              </Link>
            </>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="absolute left-0 right-0 mt-2 bg-white border-t border-gray-200 shadow-md z-40 px-4 py-4 md:hidden">
            <div className="space-y-3">
              <Link to="/" className="block text-gray-700 hover:text-blue-500">
                Home
              </Link>
              <>
                <Link
                  to="/sign-in"
                  className="block text-gray-700 hover:text-blue-500"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="block text-blue-500 font-semibold"
                >
                  Sign Up
                </Link>
              </>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

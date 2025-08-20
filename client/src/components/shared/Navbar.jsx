import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FaUser, FaSignOutAlt, FaPlus, FaListAlt } from "react-icons/fa";

export default function Navbar() {
  const { user, signOutUser, loading } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/sign-in");
      toast.success("Sign out successful!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <nav className="bg-emerald-50 border-b border-emerald-200 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-xl">🌍</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-gray-900 tracking-tight">
                  Wander<span className="text-emerald-600">World</span>
                </span>
                <span className="text-xs text-emerald-600 font-medium -mt-1">
                  Discover the World
                </span>
              </div>
            </Link>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="ml-4 inline-flex items-center justify-center p-2 rounded-md text-emerald-400 hover:text-emerald-500 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
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

          <div className="hidden md:flex items-center">
            <Link
              to="/"
              className="text-gray-700 hover:text-emerald-600 px-4 py-2 text-sm font-medium rounded-lg hover:bg-emerald-200 transition-colors duration-100"
            >
              Home
            </Link>
            {user && (
              <>
                <Link
                  to="/all-tourist-spots"
                  className="text-gray-700 hover:text-emerald-600 px-4 py-2 text-sm font-medium rounded-lg hover:bg-emerald-200 transition-colors duration-100"
                >
                  All Tourist Spots
                </Link>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            ) : user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-emerald-700 hover:text-emerald-600 focus:outline-none rounded-full">
                  <img
                    src={
                      user.photoURL ||
                      "https://i.ibb.co/9H2PJ7h2/d43801412989.jpg"
                    }
                    alt="Profile"
                    className="w-8 h-8 rounded-full border"
                  />
                  <span className="hidden sm:block text-sm font-medium">
                    {user.displayName || "User"}
                  </span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-emerald-100 rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    <Link
                      to="/my-list"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-emerald-200 transition-colors duration-100"
                    >
                      <FaListAlt className="mr-2 text-emerald-600" />
                      My Travel List
                    </Link>
                    <Link
                      to="/add-tourist-spot"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-emerald-200 transition-colors duration-100"
                    >
                      <FaPlus className="mr-2 text-emerald-600" />
                      Add Destination
                    </Link>
                    <div className="border-t border-emerald-100 my-1"></div>
                    <Link
                      to="/user-profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-emerald-200 transition-colors duration-100"
                    >
                      <FaUser className="mr-2 text-emerald-600" />
                      Your Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-200 transition-colors duration-100"
                    >
                      <FaSignOutAlt className="mr-2 text-emerald-600" />
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/sign-in"
                  className="text-gray-700 hover:text-emerald-600 px-4 py-2 text-sm font-medium rounded-xl hover:bg-emerald-50"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="bg-emerald-500 text-white hover:bg-emerald-600 px-4 py-2 rounded-xl text-sm font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {mobileMenuOpen && (
          <>
            <div className="absolute left-0 right-0 bg-emerald-100 border-t border-gray-200 shadow-md z-40 px-4 py-4 md:hidden">
              <div className="space-y-3">
                <Link
                  to="/"
                  className="block text-gray-700 hover:text-emerald-600 px-4 py-2 text-sm font-medium rounded-xl hover:bg-emerald-200 transition-colors duration-100"
                >
                  Home
                </Link>
                {user && (
                  <Link
                    to="/all-tourist-spots"
                    className="block text-gray-700 hover:text-emerald-600 px-4 py-2 text-sm font-medium rounded-xl hover:bg-emerald-200 transition-colors duration-100"
                  >
                    All Tourist Spots
                  </Link>
                )}
                {!loading && user && (
                  <>
                    <div className="flex items-center space-x-3 pt-4 border-t border-gray-200 px-4">
                      <img
                        src={
                          user.photoURL ||
                          "https://i.ibb.co/9H2PJ7h2/d43801412989.jpg"
                        }
                        alt="Profile"
                        className="w-8 h-8 rounded-full border"
                      />
                      <span className="text-sm font-medium text-gray-800">
                        {user.displayName || "User"}
                      </span>
                    </div>
                    <Link
                      to="/my-list"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-emerald-200 transition-colors duration-100"
                    >
                      <FaListAlt className="mr-2 text-emerald-600" />
                      My Travel List
                    </Link>
                    <Link
                      to="/add-tourist-spot"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-emerald-200 transition-colors duration-100"
                    >
                      <FaPlus className="mr-2 text-emerald-600" />
                      Add Destination
                    </Link>
                    <div className="border-t border-emerald-100 my-1"></div>
                    <Link
                      to="/user-profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-emerald-200 transition-colors duration-100"
                    >
                      <FaUser className="mr-2 text-emerald-600" />
                      Your Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-200 transition-colors duration-100"
                    >
                      <FaSignOutAlt className="mr-2 text-emerald-600" />
                      Sign out
                    </button>
                  </>
                )}
                {!loading && !user && (
                  <>
                    <Link
                      to="/sign-in"
                      className="block text-gray-700 hover:text-emerald-600 px-4 py-2 text-sm font-medium rounded-xl hover:bg-emerald-200 transition-colors duration-100"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/sign-up"
                      className="block text-gray-700 hover:text-emerald-600 px-4 py-2 text-sm font-medium rounded-xl hover:bg-emerald-200 transition-colors duration-100"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

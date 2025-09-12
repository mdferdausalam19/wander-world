import { Link } from "react-router";

export default function HeroBanner() {
  return (
    <div className="relative w-full flex items-center justify-center pt-24 pb-12 md:pt-0 md:pb-0 bg-gradient-to-t from-emerald-100/50 via-emerald-200 to-emerald-300">
      <div className="max-w-7xl mx-auto">
        {/* Content */}
        <div className="flex flex-col items-center justify-center text-center overflow-visible px-4 sm:px-6 lg:px-8 py-10 sm:py-20 md:py-30 lg:py-40">
          <div className="mb-8 flex items-center justify-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black drop-shadow-2xl">
              Wander<span className="text-emerald-600">World</span>
            </h1>
          </div>

          {/* Tagline */}
          <div className="mb-6 space-y-4">
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 drop-shadow-lg text-emerald-700">
              Discover • Share • Explore
            </p>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl md:max-w-4xl mx-auto drop-shadow px-2 font-light mt-6 text-gray-700">
              Your gateway to the world's most incredible destinations. Join our
              global community of travelers and discover hidden gems, share your
              adventures, and plan your next unforgettable journey.
            </p>
          </div>

          {/* Call to Action */}
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-center w-full">
            <Link
              to="/all-tourist-spots"
              className="w-full sm:w-auto bg-emerald-50/20 backdrop-blur-sm border border-emerald-400  px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50/50 transition-all duration-200 flex items-center justify-center text-gray-700"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Start Exploring
            </Link>
            <Link
              to="/add-tourist-spot"
              className="w-full sm:w-auto border border-emerald-400  px-6 py-3 rounded-xl font-semibold hover:bg-emerald-400/50 transition-all duration-200 flex items-center justify-center text-gray-700"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Destination
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

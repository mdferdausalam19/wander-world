export default function QuickStats() {
  const stats = {
    destinations: 28,
    countries: 195,
    travelers: 1200,
    recentAdditions: 47,
  };

  const countryFlags = [
    "🇬🇷",
    "🇮🇩",
    "🇯🇵",
    "🇫🇷",
    "🇵🇪",
    "🇮🇹",
    "🇹🇭",
    "🇪🇸",
    "🇺🇸",
    "🇧🇷",
  ];

  const recentDestinations = ["Santorini, Greece"];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Join the Global{" "}
          <span className="text-emerald-600">Travel Community</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-500 max-w-3xl mx-auto">
          Connect with fellow wanderers, discover breathtaking destinations, and
          create memories that last a lifetime
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Total Destinations */}
        <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl p-5 border border-emerald-50 transform hover:-translate-y-2 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="p-4 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl group-hover:from-emerald-200 group-hover:to-emerald-100 transition-all duration-300">
              <svg
                className="w-8 h-8 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 12.414a6 6 0 111.414-1.414l4.243 4.243a1 1 0 01-1.414 1.414z"
                />
              </svg>
            </div>
            <span className="text-3xl">🏞️</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
            {stats.destinations}K
          </div>
          <div className="text-gray-500 text-sm font-medium mb-2">
            Amazing Destinations
          </div>
          <div className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-lg">
            ✨ Latest: {recentDestinations[0]}
          </div>
        </div>

        {/* Countries Covered */}
        <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl p-5 border border-emerald-50 transform hover:-translate-y-2 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl group-hover:from-blue-200 group-hover:to-blue-100 transition-all duration-300">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex -space-x-1">
              {countryFlags.slice(0, 3).map((flag, index) => (
                <span
                  key={index}
                  className="text-2xl transform hover:scale-110 transition-transform duration-200"
                >
                  {flag}
                </span>
              ))}
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
            {stats.countries}
          </div>
          <div className="text-gray-500 text-sm font-medium mb-2">
            Countries & Territories
          </div>
          <div className="flex flex-wrap gap-1">
            {countryFlags.map((flag, index) => (
              <span
                key={index}
                className="text-lg hover:scale-125 transition-transform duration-200 cursor-pointer"
              >
                {flag}
              </span>
            ))}
          </div>
        </div>

        {/* Active Travelers */}
        <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl p-5 border border-emerald-50 transform hover:-translate-y-2 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl group-hover:from-purple-200 group-hover:to-purple-100 transition-all duration-300">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <span className="text-3xl">👥</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
            {stats.travelers}K
          </div>
          <div className="text-gray-500 text-sm font-medium mb-2">Active Travelers</div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-600 text-sm font-semibold">
              +{Math.floor(stats.travelers * 0.001)} joined today
            </span>
          </div>
        </div>

        {/* Recent Additions */}
        <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl p-5 border border-emerald-50 transform hover:-translate-y-2 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="p-4 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl group-hover:from-orange-200 group-hover:to-orange-100 transition-all duration-300">
              <svg
                className="w-8 h-8 text-orange-600"
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
            </div>
            <span className="text-3xl">🚀</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
            {stats.recentAdditions}
          </div>
          <div className="text-gray-500 text-sm font-medium mb-2">New This Week</div>
          <div className="bg-orange-50 text-orange-700 text-xs font-semibold px-3 py-1 rounded-lg">
            🔥 Trending destination
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Start Your Adventure?
          </h3>
          <p className="text-emerald-100 mb-6 text-lg">
            Join thousands of travelers sharing their experiences and
            discovering new places every day
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors duration-200 shadow-lg">
              Create Account
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors duration-200">
              Browse Destinations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

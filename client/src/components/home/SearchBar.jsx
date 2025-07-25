import React, { useState } from "react";

export default function SearchBar () {
  const [searchData, setSearchData] = useState({
    location: "",
    destinationType: "",
    dateFrom: "",
    dateTo: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Search data:", searchData);
    }, 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-emerald-50/95 backdrop-blur-sm rounded-3xl shadow-2xl p-5 border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Location Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Where to?
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search destination, city, country..."
                value={searchData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
              />
              <div className="absolute left-4 top-3.5">
                <svg
                  className="w-5 h-5 text-emerald-500"
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
            </div>
          </div>

          {/* Destination Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Type
            </label>
            <select
              value={searchData.destinationType}
              onChange={(e) =>
                handleInputChange("destinationType", e.target.value)
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
            >
              <option value="">Any type</option>
              <option value="beach">Beach</option>
              <option value="mountain">Mountain</option>
              <option value="city">City</option>
              <option value="historic">Historic</option>
              <option value="nature">Nature</option>
            </select>
          </div>

          {/* Search Button */}
          <div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Searching...
                </div>
              ) : (
                <div className="flex items-center justify-center">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Explore
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

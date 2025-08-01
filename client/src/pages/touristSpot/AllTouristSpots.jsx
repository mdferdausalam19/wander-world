import React, { useState } from "react";
import { sampleDestinations } from "../../data/sampleDestinations";
import TouristSpotCard from "../../components/touristSpot/TouristSpotCard";

export default function AllTouristSpots() {
  const [search, setSearch] = useState("");
  const [continent, setContinent] = useState("");
  const [sort, setSort] = useState("name");

  const continents = [
    "",
    "Africa",
    "Asia",
    "Australia",
    "Europe",
    "North America",
    "South America",
    "Antarctica",
  ];
  const sortedSpots = [...sampleDestinations]
    .filter(
      (spot) =>
        spot.name.toLowerCase().includes(search.toLowerCase()) &&
        (continent === "" || spot.continent === continent)
    )
    .sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "cost") return a.averageCost - b.averageCost;
      if (sort === "visitors") return b.visitorsPerYear - a.visitorsPerYear;
      return 0;
    });

  return (
    <div className="min-h-screen bg-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-emerald-700 mb-2">
            All Tourist Spots
          </h1>
          <p className="text-gray-500 mb-4">
            Browse, search, and filter all destinations shared by the
            WanderWorld community.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-emerald-500 rounded-lg px-3 py-2 focus:outline-emerald-500 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <select
            value={continent}
            onChange={(e) => setContinent(e.target.value)}
            className="border border-emerald-500 rounded-lg px-3 py-2 focus:outline-emerald-500 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {continents.map((c) => (
              <option key={c} value={c}>
                {c === "" ? "All Continents" : c}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-emerald-500 rounded-lg px-3 py-2 focus:outline-emerald-500 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="name">Sort: Name</option>
            <option value="cost">Sort: Cost (Low to High)</option>
            <option value="visitors">Sort: Visitors (High to Low)</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sortedSpots.length === 0 ? (
            <div className="col-span-full text-center text-gray-400">
              No destinations found.
            </div>
          ) : (
            sortedSpots.map((spot) => (
              <TouristSpotCard key={spot.id} spot={spot} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

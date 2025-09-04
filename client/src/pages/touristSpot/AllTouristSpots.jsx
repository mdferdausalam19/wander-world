import React, { useState } from "react";
import TouristSpotCard from "../../components/touristSpot/TouristSpotCard";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

export default function AllTouristSpots() {
  const [search, setSearch] = useState("");
  const [continent, setContinent] = useState("");
  const [sort, setSort] = useState("name");
  const axiosCommon = useAxiosCommon();

  const { data: spots = [], isLoading } = useQuery({
    queryKey: ["spots"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/destinations");
      return data.data;
    },
  });

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
  const sortedSpots = [...spots]
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
    <div className="min-h-screen bg-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-emerald-700 mb-2">
            All Tourist Spots
          </h1>
          <p className="text-gray-500 mb-4">
            Browse, search, and filter all destinations shared by the
            WanderWorld community.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 mb-8 justify-center border border-emerald-600 p-5 rounded-lg bg-emerald-50/50 backdrop-blur-sm">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-emerald-500 rounded-lg px-3 py-2 focus:outline-emerald-500 focus:ring-emerald-500 focus:border-emerald-500 flex-1"
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
          {isLoading ? (
            <LoadingSpinner />
          ) : sortedSpots.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 border border-emerald-600 p-10 rounded-lg bg-emerald-50/50 ">
              <h2 className="text-2xl font-bold text-emerald-700 mb-2">
                No destinations found.
              </h2>
              <p className="text-gray-500">Try different filters or search.</p>
            </div>
          ) : (
            sortedSpots.map((spot) => (
              <TouristSpotCard key={spot._id} spot={spot} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

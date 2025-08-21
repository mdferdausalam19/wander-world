import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router";

function formatCurrency(amount) {
  return amount ? `$${amount.toLocaleString()}` : "N/A";
}

function formatVisitors(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num;
}

const seasonColors = {
  Summer: "bg-amber-100 text-amber-700",
  Winter: "bg-blue-100 text-blue-700",
  "Year-round": "bg-emerald-100 text-emerald-700",
};

export default function TouristSpotCard({ spot }) {
  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      <div className="w-full aspect-video overflow-hidden">
        <img
          src={spot.images[0]}
          alt={spot.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 flex flex-col p-4 gap-2">
        <div className="flex items-center gap-2 mb-1">
          <FaMapMarkerAlt className="text-emerald-400" />
          <span className="font-semibold text-gray-800 text-sm truncate">
            {spot.location.city}, {spot.location.country}
          </span>
        </div>
        <h3
          className="text-lg font-bold text-gray-900 truncate"
          title={spot.name}
        >
          {spot.name}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>{formatCurrency(spot.averageCost)}</span>
          <span className="mx-1">·</span>
          <span>{formatVisitors(spot.visitorsPerYear)} visitors</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-1">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              seasonColors[spot.seasonality] || "bg-gray-100 text-gray-500"
            }`}
          >
            {spot.seasonality}
          </span>
        </div>
        <Link
          to={`/tourist-spot/${spot.id}`}
          className="mt-4 w-full bg-emerald-500 text-white rounded-xl py-2 font-semibold shadow hover:bg-emerald-600 transition-colors text-sm cursor-pointer hover:shadow-md text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

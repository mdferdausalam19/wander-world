import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { sampleDestinations } from "../../data/sampleDestinations";

const formatTravelTime = (travelTime) => {
  if (!travelTime) return "N/A";

  const parts = [];
  if (travelTime.days > 0) {
    parts.push(`${travelTime.days} day${travelTime.days > 1 ? "s" : ""}`);
  }
  if (travelTime.hours > 0) {
    parts.push(`${travelTime.hours} hour${travelTime.hours > 1 ? "s" : ""}`);
  }

  return parts.join(" ") || "Less than an hour";
};

const findSpotById = (id) => {
  return sampleDestinations.find(
    (spot) => spot.id.toString() === id.toString()
  );
};

export default function TouristSpotDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [spot, setSpot] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpot = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 200));

        // Find the spot in our sample data
        const foundSpot = findSpotById(id);

        if (!foundSpot) {
          throw new Error("Destination not found");
        }

        // Transform the data to match our component's expected format
        const spotData = {
          ...foundSpot,
          city: foundSpot.location.city,
          country: foundSpot.location.country,
          continent: foundSpot.location.continent,
          imageUrl: foundSpot.images[0],
          additionalImages: foundSpot.images.slice(1),
          averageCost: foundSpot.averageCost,
          seasonality: foundSpot.seasonality,
          visitorsPerYear: foundSpot.visitorsPerYear,
          travelTime: foundSpot.travelTime,
          description: foundSpot.description || "No description available.",
        };

        setSpot(spotData);
      } catch (error) {
        console.error("Error fetching destination:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSpot();
    }
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!spot) {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-700 mb-4">
            Destination not found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer"
          >
            <FaArrowLeft className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="py-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium cursor-pointer"
          >
            <FaArrowLeft className="mr-2" />
            Back to results
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative h-96 rounded-xl overflow-hidden mt-4">
          <div className="absolute inset-0">
            <img
              src={spot.images?.[0] || spot.imageUrl}
              alt={spot.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          {/* Spot Title */}
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-end pb-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold text-white mb-2">
                {spot.name}
              </h1>
              <div className="flex items-center text-white/90">
                <FaMapMarkerAlt className="mr-2" />
                <span className="text-lg">
                  {spot.location?.city || spot.city},{" "}
                  {spot.location?.country || spot.country}
                  {spot.continent && ` • ${spot.continent}`}
                </span>
              </div>
              {spot.seasonality && (
                <span className="inline-block mt-3 px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                  Best time to visit: {spot.seasonality}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-4 border border-emerald-100">
                  <p className="text-sm text-gray-500">Average Cost</p>
                  <p className="font-medium">
                    $
                    {spot.averageCost
                      ? spot.averageCost.toLocaleString()
                      : "N/A"}
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-4 border border-emerald-100">
                  <p className="text-sm text-gray-500">Best Time to Visit</p>
                  <p className="font-medium">
                    {spot.seasonality || "Year-round"}
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-4 border border-emerald-100">
                  <p className="text-sm text-gray-500">Annual Visitors</p>
                  <p className="font-medium">
                    {spot.visitorsPerYear
                      ? spot.visitorsPerYear.toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-emerald-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  About {spot.name}
                </h2>
                <div className="prose max-w-none text-gray-600">
                  {spot.description || "No description available."}
                </div>

                {/* Additional Information */}
                {(spot.travelTime || spot.averageCost) && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">
                      Travel Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Travel Time</p>
                        <p className="font-medium">
                          {formatTravelTime(spot.travelTime)}
                        </p>
                      </div>
                      {spot.averageCost && (
                        <div>
                          <p className="text-sm text-gray-500">Average Cost</p>
                          <p className="font-medium">
                            ${spot.averageCost.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Weather Widget */}
          </div>
        </div>
      </div>
    </div>
  );
}

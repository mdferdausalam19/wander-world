import { useParams, useNavigate } from "react-router";
import { FaMapMarkerAlt, FaArrowLeft, FaHeart } from "react-icons/fa";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import WeatherWidget from "../../components/weather/WeatherWidget";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

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

export default function TouristSpotDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosCommon = useAxiosCommon();
  const { user } = useAuth();
  const [likeStatus, setLikeStatus] = useState(false);
  const queryClient = useQueryClient();

  const { data: spot = {}, isLoading } = useQuery({
    queryKey: ["spot", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/destinations/${id}`);
      setLikeStatus(data.data.likes.includes(user?.uid));
      return data.data;
    },
  });

  const { mutateAsync: likeSpot, isLoading: isLikeLoading } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosCommon.patch(`/destinations/likes/${id}`, {
        uid: user?.uid,
      });
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["spot", id] });
      if (data.success) {
        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });

  const handleLikeSpot = async () => {
    try {
      await likeSpot();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (isLoading || isLikeLoading) {
    return <LoadingSpinner />;
  }

  if (!spot) {
    return (
      <div className="min-h-screen bg-emerald-100 flex items-center justify-center">
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
    <div className="min-h-screen">
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
              src={spot.imageUrl}
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
                  {spot.location?.city}, {spot.location?.country}
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
        <div className="max-w-7xl mx-auto py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
                <div className="bg-white rounded-xl shadow-sm p-4 border border-emerald-100 flex flex-col">
                  <p className="text-sm text-gray-500">Total Likes</p>
                  <p className="flex items-center mt-1">
                    <FaHeart className="text-xl text-emerald-500 mr-2" />
                    <span className="font-medium">{spot.likes?.length}</span>
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
                <div className="flex items-center justify-start mt-6 border-t border-gray-100 pt-6">
                  <button
                    onClick={handleLikeSpot}
                    className="flex items-center px-4 py-2 border border-emerald-500 
                    bg-emerald-100 text-emerald-900 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer "
                  >
                    {likeStatus ? (
                      <FaHeart className="mr-2 text-emerald-900" />
                    ) : (
                      <FaHeart className="mr-2 text-emerald-400" />
                    )}
                    <span>{likeStatus ? "Liked" : "Like"}</span>
                  </button>
                </div>
              </div>
            </div>
            {/* Right Column */}
            <div className="space-y-6">
              {/* Weather Widget */}
              <WeatherWidget location={spot?.location} />
              {/* Host Info */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-emerald-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Host Information
                </h2>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16">
                    <img
                      src={spot?.author?.avatar}
                      alt="host avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{spot?.author?.name}</p>
                    <p className="text-sm text-gray-500">
                      {spot?.author?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

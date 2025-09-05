import TouristSpotCard from "../touristSpot/TouristSpotCard";
import { Link } from "react-router";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../shared/LoadingSpinner";

export default function PopularDestinations() {
  const axiosCommon = useAxiosCommon();

  const { data: spots = [], isLoading } = useQuery({
    queryKey: ["spots"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/destinations");
      return data.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!spots || spots.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Popular Destinations
        </h2>
        <p className="text-gray-600 mb-8">
          No destinations found. Be the first to add a dream spot!
        </p>
        <Link
          to="/add-tourist-spot"
          className="inline-block bg-emerald-500 text-white rounded-xl px-6 py-2 font-semibold shadow hover:bg-emerald-600 transition-colors"
        >
          Add Tourist Spot
        </Link>
      </div>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Popular <span className="text-emerald-600">Destinations</span>
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Discover the world’s most loved travel spots, handpicked by our
          community. Explore, like, and plan your next adventure!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {spots.slice(0, 12).map((spot) => (
          <TouristSpotCard key={spot._id} spot={spot} />
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <Link
          to="/all-tourist-spots"
          className="inline-block bg-white border border-emerald-100 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl px-8 py-3 font-semibold shadow-sm transition-colors"
        >
          See All Tourist Spots
        </Link>
      </div>
    </section>
  );
}

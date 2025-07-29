import { useState } from "react";
import TouristSpotCard from "../touristSpot/TouristSpotCard";
import { sampleDestinations } from "../../data/sampleDestinations";
import { Link } from "react-router";

export default function PopularDestinations({ spots = sampleDestinations }) {
  const [liked, setLiked] = useState({});

  const handleLike = (id, isLiked) => {
    setLiked((prev) => ({ ...prev, [id]: isLiked }));
  };

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
          Popular Destinations
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Discover the world’s most loved travel spots, handpicked by our
          community. Explore, like, and plan your next adventure!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {spots.slice(0, 12).map((spot) => (
          <TouristSpotCard
            key={spot.id}
            spot={spot}
            liked={liked[spot.id] || false}
            onLike={handleLike}
          />
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

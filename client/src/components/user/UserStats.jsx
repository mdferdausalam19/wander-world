import { FaMapMarkerAlt, FaHeart } from "react-icons/fa";

const UserStats = ({ totalDestinations = 0, totalLikes = 0 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600 mr-4">
            <FaMapMarkerAlt className="text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Destinations</p>
            <p className="text-2xl font-bold text-gray-800">
              {totalDestinations}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-lg bg-pink-50 text-pink-500 mr-4">
            <FaHeart className="text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Likes</p>
            <p className="text-2xl font-bold text-gray-800">{totalLikes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;

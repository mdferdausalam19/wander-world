import { useState } from "react";
import { Link } from "react-router";
import { FaPlus } from "react-icons/fa";
import UserStats from "../../components/user/UserStats";
import MyListTable from "../../components/user/MyListTable";
import DeleteDestinationModal from "../../components/user/DeleteDestinationModal";
import EditDestinationModal from "../../components/user/EditDestinationModal";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";

export default function MyList() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const { user, isLoading: userLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: spots = [], isLoading: spotsLoading } = useQuery({
    queryKey: ["spots", user?.uid],
    enabled: !!user?.uid && !userLoading,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/destinations/user/${user?.uid}`);
      return data.data;
    },
  });

  const { mutateAsync: updateDestination } = useMutation({
    mutationFn: async (destination) => {
      const { data } = await axiosSecure.put(
        `/destinations/${destination._id}`,
        destination
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["spots", user?.uid],
      });
      toast.success("Destination updated successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update destination");
    },
  });

  const { mutateAsync: deleteDestination } = useMutation({
    mutationFn: async (destination) => {
      const { data } = await axiosSecure.delete(
        `/destinations/${destination._id}`
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["spots", user?.uid],
      });
      toast.success("Destination deleted successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete destination");
    },
  });

  const handleEdit = (destination) => {
    setSelectedDestination(destination);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (updatedDestination) => {
    await updateDestination(updatedDestination);
    setShowEditModal(false);
  };

  const handleDeleteClick = (destination) => {
    setSelectedDestination(destination);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteDestination(selectedDestination);
    setShowDeleteModal(false);
  };

  // Calculate user stats
  const totalDestinations = spots.length;
  const totalLikes = spots.reduce(
    (sum, dest) => sum + (dest.likes ? dest.likes.length : 0),
    0
  );

  if (spotsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-emerald-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Your Hosted Destinations
            </h1>
            <p className="text-gray-600 mt-1">
              Manage all the destinations you've listed as a host
            </p>
          </div>
          <Link
            to="/add-tourist-spot"
            className="mt-4 md:mt-0 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <FaPlus className="mr-2" />
            List New Destination
          </Link>
        </div>

        {/* User Stats */}
        <UserStats
          totalDestinations={totalDestinations}
          totalLikes={totalLikes}
        />

        {/* Destinations Table */}
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
          {spots.length === 0 ? (
            <div className="p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No destinations found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by adding a new destination.
              </p>
              <div className="mt-6">
                <Link
                  to="/add-tourist-spot"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  <FaPlus className="-ml-1 mr-2 h-4 w-4" />
                  List New Destination
                </Link>
              </div>
            </div>
          ) : (
            <MyListTable
              destinations={spots}
              onDelete={(id) => {
                const destination = spots.find((dest) => dest._id === id);
                handleDeleteClick(destination);
              }}
              onEdit={(id) => {
                const destination = spots.find((dest) => dest._id === id);
                handleEdit(destination);
              }}
            />
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <EditDestinationModal
        open={showEditModal}
        destination={selectedDestination}
        onSave={handleSaveEdit}
        onCancel={() => setShowEditModal(false)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteDestinationModal
        open={showDeleteModal}
        destination={selectedDestination}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}

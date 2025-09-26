import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import HostModal from "../../components/host/HostModal";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router";
import { BsStars } from "react-icons/bs";
import useRole from "../../hooks/useRole";

export default function UserProfile() {
  const [hostModalOpen, setHostModalOpen] = useState(false);
  const { user, updateUserProfile, loading, setLoading } = useAuth();
  const { role, isLoading: roleLoading } = useRole();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isHost, setIsHost] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { displayName, photoURL } = data;
    try {
      setLoading(true);
      await updateUserProfile(displayName, photoURL);
      await axiosSecure.put(`/users/${user.uid}`, {
        name: displayName,
        avatar: photoURL,
      });
      toast.success("Profile updated successfully!");
      reset(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const { data: hostRequestData = {}, isLoading: hostRequestLoading } =
    useQuery({
      queryKey: ["host-request", user.uid],
      queryFn: async () => {
        const { data } = await axiosSecure.get(`/users/${user.uid}`);
        if (data.data.role === "Host") {
          setIsHost(true);
        }
        if (data.data.isHostRequest === true) {
          setIsSubmitted(true);
        }
        return data.data;
      },
    });

  const { mutateAsync: hostRequest } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.put(`/hosts`, {
        uid: user.uid,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["host-request", user.uid],
      });
      toast.success("Host request submitted successfully!");
      setIsSubmitted(true);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleHostSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await hostRequest();
    } catch (error) {
      console.error("Error submitting host request:", error);
    } finally {
      setIsSubmitting(false);
      setHostModalOpen(false);
    }
  };

  const handleHostModalOpen = () => {
    setHostModalOpen(true);
  };

  const handleHostModalClose = () => {
    setHostModalOpen(false);
  };

  if (loading || hostRequestLoading || roleLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Host Section */}
      {role !== "Admin" && (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 max-w-xl mx-auto mb-10">
          {!isHost ? (
            <>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-4">
                    <FiCheckCircle className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Application Submitted!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for your interest in becoming a host. Our team
                    will review your application and get back to you within
                    24-48 hours.
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-emerald-900 mb-2">
                      Become a WanderWorld Host
                    </h2>
                    <p className="text-emerald-700 max-w-lg mx-auto">
                      Share your unique travel experiences and earn money by
                      hosting travelers in your favorite destinations.
                    </p>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={handleHostModalOpen}
                      className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                      Start Your Hosting Journey
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <BsStars className="text-yellow-500 text-6xl mb-6 animate-pulse transition-all duration-300" />
              <p className="text-emerald-600 font-semibold text-2xl mb-6">
                Congratulations! You are a host now.
              </p>
              <p className="text-emerald-600 font-semibold text-xl mb-6 text-center">
                You can add your destination to the platform.
              </p>
              <Link
                to="/add-tourist-spot"
                className="bg-emerald-500 text-white rounded-xl px-6 py-2 font-semibold shadow hover:bg-emerald-600 transition-colors text-sm cursor-pointer hover:shadow-md text-center"
              >
                Add Destination
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Profile Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center border border-emerald-100 max-w-xl mx-auto">
        <img
          src={user?.photoURL || "https://i.ibb.co/9H2PJ7h2/d43801412989.jpg"}
          referrerPolicy="no-referrer"
          alt={user?.displayName || "User"}
          className="w-28 h-28 rounded-full border-4 border-emerald-400 object-cover shadow mb-4"
        />
        <h2 className="text-2xl font-bold text-emerald-900 mt-2 mb-1">
          {user?.displayName || "No Name"}
        </h2>
        <p className="text-emerald-600 text-sm mb-6">{user?.email}</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mt-2 space-y-4"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              {...register("displayName", { required: "Name is required" })}
              className="w-full px-3 py-2 border border-emerald-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-300 placeholder-gray-400 text-gray-600"
              placeholder="Enter your name"
              defaultValue={user?.displayName}
            />
            {errors.displayName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.displayName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Profile Photo URL
            </label>
            <input
              {...register("photoURL")}
              className="w-full px-3 py-2 border border-emerald-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-300 placeholder-gray-400 text-gray-600"
              placeholder="Paste image URL"
              defaultValue={user?.photoURL}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              {...register("email")}
              className="w-full px-3 py-2 border border-emerald-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 placeholder-gray-400 text-gray-600"
              placeholder="Enter your email"
              disabled
              defaultValue={user?.email}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded transition disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin text-xl" />
            ) : (
              "Update Profile"
            )}
          </button>
        </form>
      </div>

      {hostModalOpen && (
        <HostModal
          isOpen={hostModalOpen}
          isSubmitting={isSubmitting}
          onClose={handleHostModalClose}
          onSubmit={handleHostSubmit}
        />
      )}
    </div>
  );
}

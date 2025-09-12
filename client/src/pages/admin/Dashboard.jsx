import { useState } from "react";
import { FiUsers, FiHome } from "react-icons/fi";
import StatsCard from "../../components/admin/StatsCard";
import DestinationDataTable from "../../components/admin/DestinationDataTable";
import { FaHeart } from "react-icons/fa";
import UserDataTable from "../../components/admin/UserDataTable";
import HostDataTable from "../../components/admin/HostDataTable";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import toast from "react-hot-toast";
import SubscriberDataTable from "../../components/admin/SubscriberDataTable";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("destinations");
  const axiosCommon = useAxiosCommon();
  const queryClient = useQueryClient();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/admin/stats");
      return data.data;
    },
  });

  const { data: destinations = [], isLoading: destinationsLoading } = useQuery({
    queryKey: ["destinations"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/admin/destinations");
      return data.data;
    },
  });

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/admin/users");
      return data.data;
    },
  });

  const { data: hosts = [], isLoading: hostsLoading } = useQuery({
    queryKey: ["hosts"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/admin/hosts");
      return data.data;
    },
  });

  const { data: subscribers = [], isLoading: subscribersLoading } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/admin/newsletter");
      return data.data;
    },
  });

  const { mutateAsync: approveHost, isLoading: approveHostLoading } =
    useMutation({
      mutationFn: async (uid) => {
        const { data } = await axiosCommon.put("/hosts/approve", { uid });
        return data;
      },
      onSuccess: () => {
        toast.success("Host approved successfully");
        Promise.all([
          queryClient.invalidateQueries({ queryKey: ["users"] }),
          queryClient.invalidateQueries({ queryKey: ["hosts"] }),
          queryClient.invalidateQueries({ queryKey: ["stats"] }),
        ]);
      },
    });

  const { mutateAsync: rejectHost, isLoading: rejectHostLoading } = useMutation(
    {
      mutationFn: async (uid) => {
        const { data } = await axiosCommon.put("/hosts/reject", { uid });
        return data;
      },
      onSuccess: () => {
        toast.success("Host rejected successfully");
        Promise.all([
          queryClient.invalidateQueries({ queryKey: ["users"] }),
          queryClient.invalidateQueries({ queryKey: ["hosts"] }),
          queryClient.invalidateQueries({ queryKey: ["stats"] }),
        ]);
      },
    }
  );

  const handleApproveHost = async (uid) => {
    await approveHost(uid);
  };

  const handleRejectHost = async (uid) => {
    await rejectHost(uid);
  };

  if (
    isLoading ||
    destinationsLoading ||
    usersLoading ||
    hostsLoading ||
    subscribersLoading ||
    rejectHostLoading ||
    approveHostLoading
  ) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your platform.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title={"Total Destinations"}
            value={stats?.totalDestinations || 0}
            icon={<FiHome size={24} />}
            color="blue"
          />
          <StatsCard
            title={"Total Likes"}
            value={stats?.totalLikes || 0}
            icon={<FaHeart size={24} />}
            color="amber"
          />
          <StatsCard
            title={"Total Users"}
            value={stats?.totalRegisteredUsers || 0}
            icon={<FiUsers size={24} />}
            color="green"
          />
          <StatsCard
            title={"Total Hosts"}
            value={stats?.totalHosts || 0}
            icon={<FiHome size={24} />}
            color="blue"
          />
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "destinations", name: "All Destinations" },
              { id: "users", name: "Users" },
              { id: "hosts", name: "Hosts" },
              { id: "subscribers", name: "Subscribers" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === "destinations" && (
            <DestinationDataTable data={destinations} />
          )}
          {activeTab === "users" && (
            <UserDataTable
              data={users}
              onApproveHost={handleApproveHost}
              onRejectHost={handleRejectHost}
            />
          )}
          {activeTab === "hosts" && <HostDataTable data={hosts} />}
          {activeTab === "subscribers" && (
            <SubscriberDataTable data={subscribers} />
          )}
        </div>
      </div>
    </div>
  );
}

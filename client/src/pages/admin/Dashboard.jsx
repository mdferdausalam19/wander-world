import { useState } from "react";
import { FiUsers, FiHome, FiUser } from "react-icons/fi";
import StatsCard from "../../components/admin/StatsCard";
import DestinationDataTable from "../../components/admin/DestinationDataTable";
import { FaHeart } from "react-icons/fa";
import { sampleDestinations } from "../../data/sampleDestinations";
import UserDataTable from "../../components/admin/UserDataTable";
import HostDataTable from "../../components/admin/HostDataTable";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const destinationsData = [...sampleDestinations].slice(0, 2);

const usersData = [
  {
    id: 1,
    profileImage: "https://i.ibb.co/9H2PJ7h2/d43801412989.jpg",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "user",
    status: "active",
    registeredAt: "2025-07-10T00:00:00Z",
  },
  {
    id: 2,
    profileImage: "https://i.ibb.co/9H2PJ7h2/d43801412989.jpg",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "user",
    status: "active",
    registeredAt: "2025-07-10T00:00:00Z",
  },
];

const hostsData = [
  {
    id: 1,
    profileImage: "https://i.ibb.co/9H2PJ7h2/d43801412989.jpg",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "host",
    status: "active",
    registeredAt: "2025-07-10T00:00:00Z",
  },
  {
    id: 2,
    profileImage: "https://i.ibb.co/9H2PJ7h2/d43801412989.jpg",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "host",
    status: "active",
    registeredAt: "2025-07-10T00:00:00Z",
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("destinations");
  const axiosCommon = useAxiosCommon();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/admin/stats");
      return data.data;
    },
  });

  if (isLoading) {
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
            <DestinationDataTable data={destinationsData} />
          )}
          {activeTab === "users" && <UserDataTable data={usersData} />}
          {activeTab === "hosts" && <HostDataTable data={hostsData} />}
        </div>
      </div>
    </div>
  );
}

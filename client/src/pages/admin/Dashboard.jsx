import { useState } from "react";
import { FiUsers, FiHome, FiUser } from "react-icons/fi";
import StatsCard from "../../components/admin/StatsCard";
import DestinationDataTable from "../../components/admin/DestinationDataTable";
import { FaHeart } from "react-icons/fa";
import { sampleDestinations } from "../../data/sampleDestinations";
import UserDataTable from "../../components/admin/UserDataTable";

const destinationsData = [...sampleDestinations].slice(0, 5);

const statsData = [
  {
    id: 1,
    title: "Total Destinations",
    value: "1,234",
    icon: <FiHome size={24} />,
    color: "blue",
  },
  {
    id: 2,
    title: "Total Likes",
    value: "356",
    icon: <FaHeart size={24} />,
    color: "amber",
  },
  {
    id: 3,
    title: "Registered Users",
    value: "856",
    icon: <FiUsers size={24} />,
    color: "green",
  },
  {
    id: 4,
    title: "Total Hosts",
    value: "342",
    icon: <FiUser size={24} />,
    color: "purple",
  },
];

const usersData = [
  {
    id: 1,
    profileImage: "https://i.ibb.co/9H2PJ7h2/d43801412989.jpg",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "user",
    status: "active",
  },
  {
    id: 2,
    profileImage: "https://i.ibb.co/9H2PJ7h2/d43801412989.jpg",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "user",
    status: "active",
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("destinations");

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
          {statsData.map((stat) => (
            <StatsCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
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
        </div>
      </div>
    </div>
  );
}

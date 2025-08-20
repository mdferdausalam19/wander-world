import { useState } from "react";
import { FiUsers, FiHome, FiUser } from "react-icons/fi";
import StatsCard from "../../components/admin/StatsCard";
import PostDataTable from "../../components/admin/PostDataTable";
import { FaHeart } from "react-icons/fa";

const statsData = [
  {
    id: 1,
    title: "Total Posts",
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

const postsData = [
  {
    id: 1,
    name: "Santorini",
    location: {
      city: "Fira",
      country: "Greece",
      coordinates: { lat: 36.3932, lng: 25.4615 },
    },
    continent: "Europe",
    averageCost: 1200,
    seasonality: "Summer",
    travelTime: { days: 5, hours: 0 },
    visitorsPerYear: 2000000,
    description:
      "A stunning island with whitewashed buildings and iconic sunsets.",
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
    ],
    host: { name: "John Doe", userId: "123" },
    likes: 5,
    createdAt: "2025-07-10T00:00:00Z",
    updatedAt: "2025-07-15T00:00:00Z",
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
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
              { id: "posts", name: "All Posts" },
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
          {activeTab === "posts" && <PostDataTable data={postsData} />}
        </div>
      </div>
    </div>
  );
}

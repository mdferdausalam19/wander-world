import { FaCheck, FaTimes } from "react-icons/fa";

export default function UserDataTable({ data, onApproveHost, onRejectHost }) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6">
        <p className="text-center text-gray-500">No users found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Users</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Registered At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Updated At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Host Request Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-16 h-16">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    {item.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        item.role === "Admin"
                          ? "bg-amber-500 text-white"
                          : item.role === "Host"
                          ? "bg-green-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {item.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    {new Date(item.registeredAt).toLocaleDateString()}
                    <br />
                    {new Date(item.registeredAt).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    {new Date(item.updatedAt).toLocaleDateString()}
                    <br />
                    {new Date(item.updatedAt).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    {item.role === "Host" && item.isHostRequest === false && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500 text-white">
                        Approved
                      </span>
                    )}
                    {item.isHostRequest === true && item.role === "General" && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500 text-white">
                        Pending
                      </span>
                    )}
                    {(item.role === "General" || item.role === "Admin") &&
                      item.isHostRequest === false && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-500 text-white">
                          N/A
                        </span>
                      )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    {item.isHostRequest === true ? (
                      <div className="flex gap-2">
                        <button
                          className="px-2 py-2 text-xs font-medium rounded-full bg-blue-500 text-white cursor-pointer"
                          onClick={() => onApproveHost(item.uid)}
                        >
                          <FaCheck size={16} />
                        </button>
                        <button
                          className="px-2 py-2 text-xs font-medium rounded-full bg-red-500 text-white cursor-pointer"
                          onClick={() => onRejectHost(item.uid)}
                        >
                          <FaTimes size={16} />
                        </button>
                      </div>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-500 text-white">
                        N/A
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

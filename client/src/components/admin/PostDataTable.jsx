import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";

export default function PostDataTable({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Posts</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Host
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Likes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  {item.location?.city}, {item.location?.country}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  {item.host?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  {item.likes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => console.log("View", item)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <FiEye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => console.log("Edit", item)}
                      className="text-emerald-600 hover:text-emerald-900"
                    >
                      <FiEdit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => console.log("Delete", item)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

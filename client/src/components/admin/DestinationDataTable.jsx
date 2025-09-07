import { FiTrash2, FiEye } from "react-icons/fi";

export default function DestinationDataTable({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Destinations</h3>
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
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Continent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                AVG. Cost
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date Added
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Host
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="w-14 h-14">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  {item.location?.city}, {item.location?.country}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  {item.continent}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                    ${item.averageCost}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  {item.author?.name}
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

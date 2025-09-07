export default function HostDataTable({ data }) {
  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Hosts</h3>
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
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Host Since
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    {item.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    {item.role}
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
                  {/* <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    {new Date(item.hostSince).toLocaleDateString()}
                    <br />
                    {new Date(item.hostSince).toLocaleTimeString()}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

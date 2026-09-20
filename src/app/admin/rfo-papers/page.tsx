export default function AdminRFOPosts() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          RFO Məsələləri İdarəetməsi
        </h2>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors">
          Yeni İil Əlavə Et
        </button>
      </div>

      {/* Years table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b border-gray-200 text-left px-6 py-4 text-sm font-medium text-gray-600">
                  İil
                </th>
                <th className="border-b border-gray-200 text-left px-6 py-4 text-sm font-medium text-gray-600">
                  Mərhələlər
                </th>
                <th className="border-b border-gray-200 text-left px-6 py-4 text-sm font-medium text-gray-600">
                  Fayllar
                </th>
                <th className="border-b border-gray-200 text-center px-6 py-4 text-sm font-medium text-gray-600">
                  Əməliyyatlar
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Year rows will be populated dynamically */}
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span className="text-xl font-bold text-gray-900">2025</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      I mərhələ
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      II mərhələ
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      Final
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                      3 PDF
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                      2 cavab variantsı
                    </span>
                  </div>
                </td>
                <td className="text-center px-6 py-4 space-x-3">
                  <button className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100">
                    Redaktə
                  </button>
                  <button className="px-3 py-1 bg-red-50 text-red-600 text-xs rounded hover:bg-red-100">
                    Sil
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span className="text-xl font-bold text-gray-900">2024</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      I mərhələ
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      II mərhələ
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                      2 PDF
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                      1 cavab variantsı
                    </span>
                  </div>
                </td>
                <td className="text-center px-6 py-4 space-x-3">
                  <button className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100">
                    Redaktə
                  </button>
                  <button className="px-3 py-1 bg-red-50 text-red-600 text-xs rounded hover:bg-red-100">
                    Sil
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span className="text-xl font-bold text-gray-900">2023</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      I mərhələ
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      II mərhələ
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      Final
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                      4 PDF
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                      3 cavab variantsı
                    </span>
                  </div>
                </td>
                <td className="text-center px-6 py-4 space-x-3">
                  <button className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100">
                    Redaktə
                  </button>
                  <button className="px-3 py-1 bg-red-50 text-red-600 text-xs rounded hover:bg-red-100">
                    Sil
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
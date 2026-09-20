export default function AdminCategories() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Kateqoriyalar İdarəetməsi
        </h2>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors">
          Yeni Kateqoriya Əlavə Et
        </button>
      </div>

      {/* Categories table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                  Kateqoriya Adı
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                  Tip
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                  Seviyyə
                </th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-600">
                  Əməliyyatlar
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Category rows will be populated dynamically */}
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-800 flex items-center justify-center rounded-full">
                      📐
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Mexanika</h3>
                      <p className="text-sm text-gray-500">Hareket, qücü, energi, momentum</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    Mövzu
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Her iki seviyyə
                  </span>
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
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-800 flex items-center justify-center rounded-full">
                      ⚡
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Elektrik</h3>
                      <p className="text-sm text-gray-500">Elektrik layihəsi, qonorumu, potensial</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    Mövzu
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Her iki seviyyə
                  </span>
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
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-800 flex items-center justify-center rounded-full">
                      🔥
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Termodinamika</h3>
                      <p className="text-sm text-gray-500">Isı, temperatuura, termodinamik qanunlar</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    Mövzu
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Her iki seviyyə
                  </span>
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
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-800 flex items-center justify-center rounded-full">
                      🧲
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Maqnetizm</h3>
                      <p className="text-sm text-gray-500">Magnetlə互作用, elektromqnetik induksiya</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    Mövzu
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Her iki seviyyə
                  </span>
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
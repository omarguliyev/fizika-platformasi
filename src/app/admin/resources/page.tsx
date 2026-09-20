export default function AdminResources() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Resurslar İdarəetməsi
        </h2>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors">
          Yeni Resurs Əlavə Et
        </button>
      </div>

      {/* Search and filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Axtarış..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 10.5a6 6 0 100-12 6 6 0 000 12z"></path>
              </svg>
            </div>
          </div>
          <div className="flex-1 md:w-auto space-x-4">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Kateqorija seçin</option>
              <option value="mexanika">Mexanika</option>
              <option value="elektrik">Elektrik</option>
              <option value="termodinamika">Termodinamika</option>
              <option value="optika">Optika</option>
              <option value="maqnetizm">Maqnetizm</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Seviyyə seçin</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
              <option value="both">Her iki seviyyə</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resources table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                  Başlıq
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                  Kateqorija
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                  Seviyyə
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                  Növ
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                  İл
                </th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-600">
                  Əməliyyatlar
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Resource rows will be populated dynamically */}
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-800 flex items-center justify-center rounded-full">
                      📚
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Fizika üçün Temel Problemlər Cildi 1</h3>
                      <p className="text-sm text-gray-500">8-9 cu siniflər üçün mexanika, molekulyar fizika və termodinamika məsələləri</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    Mexanika
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Junior
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                    Kitab
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">2024</span>
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
                      📄
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">2024-il RFO Fizika İmtahanı</h3>
                      <p className="text-sm text-gray-500">Seçilmiş problemlər və cavity variantsı</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    Test
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Senior
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                    İmtahan
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">2024</span>
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
                      🎥
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Elektrostatika införوماً</h3>
                      <p className="text-sm text-gray-500">10-11 cu siniflər üçün video dərs seriyası</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    Video
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Senior
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                    Video Dərs
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">2024</span>
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
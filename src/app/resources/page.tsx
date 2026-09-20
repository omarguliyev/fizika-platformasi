export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <button className="text-gray-600 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <h1 className="text-xl font-bold text-gray-800">Resurslar Kitabxanası</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-gray-600">
              <a href="/" className="hover:text-gray-900 transition-colors">Ana səhifə</a>
              <a href="/junior" className="hover:text-gray-900 transition-colors">Junior</a>
              <a href="/senior" className="hover:text-gray-900 transition-colors">Senior</a>
            </div>
          </div>
        </div>
      </nav>

      <header className="pt-16 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Resurslar Kitabxanası
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Fizika kitablari, problem toplusu, lecture notes və Digər təhsil resursları
          </p>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Search and filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Axtarış... kitab adı, müvuzə və s."
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
                  <option value="">Mövzu seçin</option>
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
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Resurs növü seçin</option>
                  <option value="kitab">Kitab</option>
                  <option value="test">Test/imtahan</option>
                  <option value="video">Video dərs</option>
                  <option value="article">Məqalə</option>
                  <option value="other">Digər</option>
                </select>
              </div>
            </div>
          </div>

          {/* Resources grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Resource cards will be populated dynamically */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300">
              <div className="p-6">
                <div className="mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    Kitab
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Fizika üçün Temel Problemlər Cildi 1
                </h3>
                <p className="text-gray-600 mb-4">
                  8-9 cu siniflər üçün mexanika, molekulyar fizika və termodinamika məsələləri
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                    Mexanika
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                    Junior
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                    2024
                  </span>
                </div>
                <div className="flex items-center">
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800 me-4">
                    PDF-ni Oxu
                  </a>
                  <a href="#" className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    Yüklə
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300">
              <div className="p-6">
                <div className="mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                    Test
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  2024-il RFO Fizika İmtiahanı Nümūnə Testi
                </h3>
                <p className="text-gray-600 mb-4">
                  Senior seviyyə üçün completa test və cavab variantsı
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                    Test
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                    Senior
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                    2024
                  </span>
                </div>
                <div className="flex items-center">
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800 me-4">
                    PDF-ni Oxu
                  </a>
                  <a href="#" className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    Yüklə
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300">
              <div className="p-6">
                <div className="mb-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Video Dərs
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Elektrostatika införوماً: Qanunlar və Təbiqələr
                </h3>
                <p className="text-gray-600 mb-4">
                  10-11 cu siniflər üçün video dərs seriyası
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                    Video
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                    Senior
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                    Elektrik
                  </span>
                </div>
                <div className="flex items-center">
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800 me-4">
                    İzlə
                  </a>
                  <a href="#" className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    Yüklə
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
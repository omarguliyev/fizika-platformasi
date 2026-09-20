export default function SeniorPage() {
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
              <h1 className="text-xl font-bold text-gray-800">RFO Fizika — Senior</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-gray-600">
              <a href="/" className="hover:text-gray-900 transition-colors">Ana səhifə</a>
              <a href="/junior" className="hover:text-gray-900 transition-colors">Junior</a>
              <a href="/resources" className="hover:text-gray-900 transition-colors">Resurslar</a>
            </div>
          </div>
        </div>
      </nav>

      <header className="pt-16 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            RFO Fizika — Senior
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            10–11-ci sinif şagirdləri üçün
          </p>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Categories will be populated dynamically */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300 cursor-pointer">
              <div className="p-6">
                <div className="flex items-center justify-start mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0-2C6.477 6 2 10.477 2 16s4.477 10 10 10 10-4.477 10-10S17.523 6 12 6zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4-1.79 4-4 4z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Mexanika</h3>
                    <p className="text-sm text-gray-500">Hareket, qücü, impulsi, momentumunun qoruumu</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300 cursor-pointer">
              <div className="p-6">
                <div className="flex items-center justify-start mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0-2C6.477 6 2 10.477 2 16s4.477 10 10 10 10-4.477 10-10S17.523 6 12 6zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4-1.79 4-4 4z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Molekulyar fizika</h3>
                    <p className="text-sm text-gray-500">Termodinamika, statistik fizika, kinetika teoriyası</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300 cursor-pointer">
              <div className="p-6">
                <div className="flex items-center justify-start mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0-2C6.477 6 2 10.477 2 16s4.477 10 10 10 10-4.477 10-10S17.523 6 12 6zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4-1.79 4-4 4z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Elektrodinamika</h3>
                    <p className="text-sm text-gray-500">Elektrostatikə, magnetostatikə, Maxwell'in eşitlikləri</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300 cursor-pointer">
              <div className="p-6">
                <div className="flex items-center justify-start mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0-2C6.477 6 2 10.477 2 16s4.477 10 10 10 10-4.477 10-10S17.523 6 12 6zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4-1.79 4-4 4z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Maqnetizm</h3>
                    <p className="text-sm text-gray-500">Magnetla互作用, elektromqnetik induksiya</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300 cursor-pointer">
              <div className="p-6">
                <div className="flex items-center justify-start mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0-2C6.477 6 2 10.477 2 16s4.477 10 10 10 10-4.477 10-10S17.523 6 12 6zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4-1.79 4-4 4z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Optika</h3>
                    <p className="text-sm text-gray-500">Işığın təyyarı, interference, difraksiya</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300 cursor-pointer">
              <div className="p-6">
                <div className="flex items-center justify-start mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0-2C6.477 6 2 10.477 2 16s4.477 10 10 10 10-4.477 10-10S17.523 6 12 6zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4-1.79 4-4 4z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Dalğalar və rəqslər</h3>
                    <p className="text-sm text-gray-500">Mexanik dalğalar, sesdalğalar, kvantum mekanika vəvlenişləri</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
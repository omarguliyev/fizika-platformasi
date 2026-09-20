export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">
                Toplam Resurs
              </div>
              <div className="text-2xl font-bold text-gray-900">
                124
              </div>
            </div>
            <div className="h-0.5 bg-gray-200"></div>
            <p className="mt-2 text-sm text-gray-600">
              Bu ay 12 yeni resurs əlavə edildi
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">
                AI Söhbətlər
              </div>
              <div className="text-2xl font-bold text-gray-900">
                2,847
              </div>
            </div>
            <div className="h-0.5 bg-gray-200"></div>
            <p className="mt-2 text-sm text-gray-600">
              Bu ay 342 yeni söhbət
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">
                Yüklənən PDF
              </div>
              <div className="text-2xl font-bold text-gray-900">
                89
              </div>
            </div>
            <div className="h-0.5 bg-gray-200"></div>
            <p className="mt-2 text-sm text-gray-600">
              Bu ay 7 yeni PDF
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">
                Aktif İstifadəçilər
              </div>
              <div className="text-2xl font-bold text-gray-900">
                1,240
              </div>
            </div>
            <div className="h-0.5 bg-gray-200"></div>
            <p className="mt-2 text-sm text-gray-600">
              Bu ay 89 yeni istifadəçi
            </p>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Son Yükləən Resurslar
            </h2>
            <div className="space-y-4">
              {/* Recent resources will be populated dynamically */}
              <div className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 text-blue-800 flex items-center justify-center rounded-full flex-shrink-0">
                  📚
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    Mexanika Problemlər Toplusu
                  </h3>
                  <p className="text-sm text-gray-500">
                    2 saat əvvəl yükləndi
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 text-purple-800 flex items-center justify-center rounded-full flex-shrink-0">
                  📄
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    Termodinamika Lecture Notes
                  </h3>
                  <p className="text-sm text-gray-500">
                    4 saat əvvəl yükləndi
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 text-green-800 flex items-center justify-center rounded-full flex-shrink-0">
                  🎥
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    Elektrostatika Video Dərs
                  </h3>
                  <p className="text-sm text-gray-500">
                    6 saat əvvəl yükləndi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Sistem Statistikaları
            </h2>
            {/* Stats charts would go here */}
            <div className="h-96 bg-gray-50 rounded-lg">
              {/* Placeholder for charts */}
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">İstatistik qrafikleri buraya gələcək</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
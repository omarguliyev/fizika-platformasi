import prisma from "@/lib/prisma"

export default async function AdminDashboard() {
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const [resourceCount, resourcesThisMonth, pdfCount, userCount, usersThisMonth, conversationCount, conversationsThisMonth, recentResources] =
    await Promise.all([
      prisma.resource.count(),
      prisma.resource.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.resource.count({ where: { resourceType: { in: ["PDF", "BOOK", "PAST_PAPER"] } } }),
      prisma.user.count(),
      prisma.user.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.aIConversation.count(),
      prisma.aIConversation.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.resource.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, title: true, resourceType: true, createdAt: true },
      }),
    ])

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">
                Toplam Resurs:
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {resourceCount}
              </div>
            </div>
            <div className="h-0.5 bg-gray-200"></div>
            <p className="mt-2 text-sm text-gray-600">
              Bu ay {resourcesThisMonth} yeni resurs əlavə edildi
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
                {conversationCount}
              </div>
            </div>
            <div className="h-0.5 bg-gray-200"></div>
            <p className="mt-2 text-sm text-gray-600">
              Bu ay {conversationsThisMonth} yeni söhbət
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
                {pdfCount}
              </div>
            </div>
            <div className="h-0.5 bg-gray-200"></div>
            <p className="mt-2 text-sm text-gray-600">
              Ümumi kitab və PDF resursları
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
                {userCount}
              </div>
            </div>
            <div className="h-0.5 bg-gray-200"></div>
            <p className="mt-2 text-sm text-gray-600">
              Bu ay {usersThisMonth} yeni istifadəçi
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
              {recentResources.length === 0 ? (
                <p className="text-sm text-gray-500">Hələ resurs əlavə edilməyib.</p>
              ) : recentResources.map((resource) => (
                <div key={resource.id} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 text-blue-800 flex items-center justify-center rounded-full flex-shrink-0">📄</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{resource.title}</h3>
                    <p className="text-sm text-gray-500">
                      {resource.resourceType} · {resource.createdAt.toLocaleDateString("az-AZ")}
                    </p>
                  </div>
                </div>
              ))}
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
                <p className="text-gray-400">Ümumi {resourceCount} resurs, {userCount} istifadəçi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
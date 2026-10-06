import { BrandLogo } from "@/components/BrandLogo"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <BrandLogo imageClassName="h-10 w-10" />
            <div>
              <h2 className="font-semibold text-gray-900">Admin Panel</h2>
              <p className="text-sm text-gray-500">RFO Fizika Platformu</p>
            </div>
          </div>
          <nav className="space-y-2">
            <a href="/admin" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3m-3-5V9"></path>
              </svg>
              Dashboard
            </a>
            <a href="/admin/resources" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 0a2 2 0 110-4 2 2 0 010 4zm-6 0a2 2 0 110-4 2 2 0 010 4zm6 4a2 2 0 110-4 2 2 0 010 4zm-6 0a2 2 0 110-4 2 2 0 010 4z"></path>
              </svg>
              Resurslar
            </a>
            <a href="/admin/categories" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14M5 12h14"></path>
              </svg>
              Kateqoriyalar
            </a>
            <a href="/admin/rfo-papers" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7 20l10-10M5 20l2-2V6m2 10l6-6M13 8l6 6"></path>
              </svg>
              RFO Məsələləri
            </a>
            <a href="/admin/ai-settings" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0-2C6.477 6 2 10.477 2 16s4.477 10 10 10 10-4.477 10-10S17.523 6 12 6zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4-1.79 4-4 4z"></path>
              </svg>
              AI Ayarları
            </a>
            <a href="/admin/users" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.3-5.9l3-1.4a2 2 0 01-1.5-3.4V8a3 3 0 00-6 0v-1a3 3 0 01-5.3-5.9l3-1.4a2 2 0 01-1.5-3.4V8a3 3 0 00-6 0v1a3 3 0 006 0zM12 13a3 3 0 110-6 3 3 0 000 6z"></path>
              </svg>
              İstifadəçilər
            </a>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
        </header>
        {children}
      </main>
    </div>
  );
}
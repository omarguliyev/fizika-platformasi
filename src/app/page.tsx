import { getAuthSession } from "@/lib/auth"
import { LogoutButton } from "@/components/AuthNav"
import { BrandLogo } from "@/components/BrandLogo"

export default async function Home() {
  const session = await getAuthSession()
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <BrandLogo imageClassName="h-9 w-9" />
              <h1 className="text-xl font-bold text-gray-800">Fizika Platformu</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-gray-600">
              <a href="#" className="hover:text-gray-900 transition-colors">Ana səhifə</a>
              <a href="/junior" className="hover:text-gray-900 transition-colors">Junior</a>
              <a href="/senior" className="hover:text-gray-900 transition-colors">Senior</a>
              <a href="/resources" className="hover:text-gray-900 transition-colors">Resurslar</a>
              <a href="/rfo-papers" className="hover:text-gray-900 transition-colors">Keçmiş Məsələlər</a>
              <a href="/ai-assistant" className="hover:text-gray-900 transition-colors">AI Köməkçi</a>
              {session?.user?.role === "user" ? (
                <>
                  <a href="/profile" className="hover:text-gray-900 transition-colors">
                    Hesabım ({session.user.username || session.user.email})
                  </a>
                  <LogoutButton />
                </>
              ) : (
                <>
                  <a href="/login" className="hover:text-gray-900 transition-colors">Daxil ol</a>
                  <a href="/signup" className="hover:text-gray-900 transition-colors">Qeydiyyatdan keç</a>
                </>
              )}
            </div>
            <div className="md:hidden">
              <button className="text-gray-600 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <header className="pt-20 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            RFO Fizika hazırlığı üçün platforma
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Azərbaycanın ən yaxşı gənc fizikləri üçün məsələlər, kitablar, resurslar və süni intellekt dəstəyi.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0-2C6.477 6 2 10.477 2 16s4.477 10 10 10 10-4.477 10-10S17.523 6 12 6zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4-1.79 4-4 4z"></path>
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  RFO Fizika — Junior
                </h2>
                <p className="text-gray-600 mb-6">
                  8–9-cu siniflər
                </p>
                <a href="/junior" title="Bu sizi Junior bölməsinə aparır" className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors transform hover:-translate-y-1">
                  Junior bölməsinə keç
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <img src="/senior-icon.svg" alt="Senior Icon" className="w-16 h-16" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  RFO Fizika — Senior
                </h2>
                <p className="text-gray-600 mb-6">
                  10–11-ci siniflər
                </p>
                <a href="/senior" title="Bu sizi Senior bölməsinə aparır" className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors transform hover:-translate-y-1">
                  Senior bölməsinə keç
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="py-16">
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Faydalı resurslar
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300">
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 0a2 2 0 110-4 2 2 0 010 4zm-6 0a2 2 0 110-4 2 2 0 010 4zm6 4a2 2 0 1100-4 2 2 0 010 4zm-6 0a2 2 0 110-4 2 2 0 010 4z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Keçmiş illərin məsələləri</h3>
                <p className="text-sm text-gray-500">RFO Fizika keçmiş illərindən seçilmiş məsələlər və hallar</p>
                <a href="/rfo-papers" className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Bax
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300">
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0-2C6.477 6 2 10.477 2 16s4.477 10 10 10 10-4.477 10-10S17.523 6 12 6zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4-1.79 4-4 4z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Kitabxana</h3>
                <p className="text-sm text-gray-500">Fizika kitabları, məsələ topluları və keçmiş suallar</p>
                <a href="/resources" className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Bax
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300">
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0-2C6.477 6 2 10.477 2 16s4.477 10 10 10 10-4.477 10-10S17.523 6 12 6zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4-1.79 4-4 4z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Süni intellekt köməkçisi</h3>
                <p className="text-sm text-gray-500">Fizika problemlərində süni intellektdən yardım alın</p>
                <a href="/ai-assistant" className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Bax
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300">
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0-2C6.477 6 2 10.477 2 16s4.477 10 10 10 10-4.477 10-10S17.523 6 12 6zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4-1.79 4-4 4z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Olimpiadaya hazırlıq</h3>
                <p className="text-sm text-gray-500">Fizika üçün hazırlıq materialları</p>
                <a href="#" className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Daha çox
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Fizika Platformu</h3>
              <p className="text-gray-600">
                Azərbaycan Respublikası Fənn Olimpiadası (RFO) — Fizika hazırlığı üçün sayt
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Sosial şəbəkələr</h3>
              <a
                href="https://www.instagram.com/adminfizika/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-gray-800"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth={2} />
                  <circle cx="12" cy="12" r="4" strokeWidth={2} />
                  <circle cx="18" cy="6" r="1" fill="currentColor" />
                </svg>
                <span>@adminfizika</span>
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Əlaqə</h3>
              <p className="text-gray-600">
                Zəhmət olmasa, saytda olmasını istədiyiniz əlavə şeyləri və iradlarınızı{" "}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=adminfizika%40gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  adminfizika@gmail.com
                </a>{" "}
                emailinə yazaraq bildirin.
              </p>
              <p className="text-gray-600 mt-2">
                Bakı, Azərbaycan
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
            © 2026 Fizika Platformu. Bütün hüquqlar qorunur.
          </div>
        </div>
      </footer>
    </div>
  );
}
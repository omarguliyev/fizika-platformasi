'use client';

import { useState, useEffect } from "react"
import { BrandLogo } from "@/components/BrandLogo"

export default function RFOPapersPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    year: "",
    stage: "",
    level: "",
    search: "",
  });

  // Fetch resources (filtered for past papers)
  const fetchResources = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("resourceType", "PAST_PAPER"); // Only get past papers

      if (filters.year) queryParams.append("year", filters.year);
      if (filters.stage) queryParams.append("stage", filters.stage);
      if (filters.level) queryParams.append("level", filters.level);
      if (filters.search) queryParams.append("search", filters.search);

      const response = await fetch(`/api/resources?${queryParams.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch resources");
      const data = await response.json();
      setResources(data);
    } catch (err) {
      setError("Failed to load resources");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    fetchResources();
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
    fetchResources();
  };

  // Initial fetch
  useEffect(() => {
    fetchResources();
  }, []);

  // Refetch when filters change
  useEffect(() => {
    fetchResources();
  }, [filters.year, filters.stage, filters.level, filters.search]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Yüklənir...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Xəta</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <BrandLogo imageClassName="h-8 w-8" />
              <button className="text-gray-600 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <h1 className="text-xl font-bold text-gray-800">Keçmiş RFO Məsələləri</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-gray-600">
              <a href="/" className="hover:text-gray-900 transition-colors">Ana səhifə</a>
              <a href="/junior" className="hover:text-gray-900 transition-colors">Junior</a>
              <a href="/senior" className="hover:text-gray-900 transition-colors">Senior</a>
              <a href="/resources" className="hover:text-gray-900 transition-colors">Resurslar</a>
            </div>
          </div>
        </div>
      </nav>

      <header className="pt-16 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Keçmiş RFO Fizika Məsələləri
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Ötən illərin RFO Fizika Olimpiadası məsələləri ilə məşq edin
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
                  placeholder="Axtarış... problème adı, mövzu və s."
                  value={filters.search}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 10.5a6 6 0 100-12 6 6 0 000 12z"></path>
                  </svg>
                </div>
              </div>
              <div className="flex-1 md:w-auto space-x-4">
                <select
                  name="year"
                  value={filters.year}
                  onChange={handleFilterChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">İl seçin</option>
                  {[2020, 2021, 2022, 2023, 2024, 2025].map(year => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  name="stage"
                  value={filters.stage}
                  onChange={handleFilterChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Mərhələ seçin</option>
                  <option value="I mərhələ">I mərhələ</option>
                  <option value="II mərhələ">II mərhələ</option>
                  <option value="Final">Final</option>
                </select>
                <select
                  name="level"
                  value={filters.level}
                  onChange={handleFilterChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Səviyyə seçin</option>
                  <option value="JUNIOR">Junior</option>
                  <option value="SENIOR">Senior</option>
                  <option value="BOTH">Hər iki səviyyə</option>
                </select>
              </div>
            </div>
          </div>

          {/* Resources grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.length === 0 ? (
              <p className="text-center col-span-3 text-gray-500">
                Heç bir RFO məsələsi tapılmadı
              </p>
            ) : (
              resources.map((resource) => (
                <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300">
                  <div className="p-6">
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        Keçmiş Məsələ
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {resource.description || ""}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.category && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                          {getCategoryLabel(resource.category)}
                        </span>
                      )}
                      {resource.level && (
                        <span className={getLevelBadgeClass(resource.level)}>
                          {getLevelLabel(resource.level)}
                        </span>
                      )}
                      {resource.year && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                          {resource.year}
                        </span>
                      )}
                      {resource.stage && (
                        <span className={getStageBadgeClass(resource.stage)}>
                          {resource.stage}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <a
                        href={`/api/resources/${resource.id}/download`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 me-4"
                      >
                        PDF-ni Oxu
                      </a>
                      <a
                        href={`/api/resources/${resource.id}/download`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                      >
                        Yüklə
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
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

// Helper functions
function getCategoryLabel(category: string): string {
  switch (category) {
    case "mexanika": return "Mexanika";
    case "elektrik": return "Elektrik";
    case "termodinamika": return "Termodinamika";
    case "optika": return "Optika";
    case "maqnetizm": return "Maqnetizm";
    default: return category || "-";
  }
}

function getLevelLabel(level: string): string {
  switch (level) {
    case "JUNIOR": return "Junior";
    case "SENIOR": return "Senior";
    case "BOTH": return "Hər iki səviyyə";
    default: return level || "-";
  }
}

function getLevelBadgeClass(level: string): string {
  switch (level) {
    case "JUNIOR": return "px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full";
    case "SENIOR": return "px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full";
    case "BOTH": return "px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full";
    default: return "px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full";
  }
}

function getStageBadgeClass(stage: string): string {
  return "px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full";
}
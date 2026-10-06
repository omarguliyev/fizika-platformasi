"use client";

import { useState, useEffect } from "react"
import { BrandLogo } from "@/components/BrandLogo"

export default function JuniorPage() {
  const [resources, setResources] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("")

  // Fetch categories (topics)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories?type=TOPIC")
        if (!response.ok) throw new Error("Failed to fetch categories")
        const data = await response.json()
        setCategories(data)
      } catch (err) {
        console.error("Error fetching categories:", err)
        // We'll continue without categories, maybe show a default list
      }
    }

    fetchCategories()
  }, [])

  // Fetch resources for junior level
  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true)
      setError(null)
      try {
        const queryParams = new URLSearchParams()
        queryParams.append("level", "JUNIOR")
        if (selectedCategory) queryParams.append("category", selectedCategory)

        const response = await fetch(`/api/resources?${queryParams.toString()}`)
        if (!response.ok) throw new Error("Failed to fetch resources")
        const data = await response.json()
        setResources(data)
      } catch (err) {
        setError("Failed to load resources")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchResources()
  }, [selectedCategory])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Yüklənir...</h2>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Xəta</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <BrandLogo imageClassName="h-8 w-8" />
              <button type="button" onClick={() => (window.location.href = "/")} className="text-gray-600 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-xl font-bold text-gray-800">RFO Fizika — Junior</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-gray-600">
              <a href="/" className="hover:text-gray-900 transition-colors">Ana səhifə</a>
              <a href="/senior" className="hover:text-gray-900 transition-colors">Senior</a>
              <a href="/resources" className="hover:text-gray-900 transition-colors">Resurslar</a>
            </div>
          </div>
        </div>
      </nav>

      <header className="pt-16 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            RFO Fizika — Junior
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            8–9-cu sinif şagirdləri üçün
          </p>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category filter */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative w-full md:w-64">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category-select">
                  Mövzu
                </label>
                <select
                  id="category-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Bütün mövzular</option>
                  {categories.map((category: any) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Resources grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.length === 0 ? (
              <p className="text-center col-span-3 text-gray-500">
                Heç bir resurs tapılmadı
              </p>
            ) : (
              resources.map((resource: any) => (
                <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300">
                  <div className="p-6">
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {getResourceTypeLabel(resource.resourceType)}
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
                        href={resource.resourceType === "TEST" ? `/tests/${resource.id}` : `/api/resources/${resource.id}/download`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 me-4"
                      >
                        {resource.resourceType === "TEST" ? "Testə başla" : "PDF-ni Oxu"}
                      </a>
                      <a
                        href={resource.resourceType === "TEST" ? `/tests/${resource.id}` : `/api/resources/${resource.id}/download`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                      >
                        {resource.resourceType === "TEST" ? "Testə başla" : "Yüklə"}
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
  )
}

// Helper functions
function getResourceTypeLabel(type: string): string {
  switch (type) {
    case "BOOK": return "Kitab"
    case "PDF": return "PDF"
    case "VIDEO": return "Video dərs"
    case "TEST": return "Test/imtahan"
    case "ARTICLE": return "Məqalə"
    case "OTHER": return "Digər"
    case "PAST_PAPER": return "Keçmiş Məsələ"
    default: return type || "-"
  }
}

function getCategoryLabel(category: string): string {
  switch (category) {
    case "mexanika": return "Mexanika"
    case "elektrik": return "Elektrik"
    case "termodinamika": return "Termodinamika"
    case "optika": return "Optika"
    case "maqnetizm": return "Maqnetizm"
    default: return category || "-"
  }
}

function getLevelLabel(level: string): string {
  switch (level) {
    case "JUNIOR": return "Junior"
    case "SENIOR": return "Senior"
    case "BOTH": return "Hər iki səviyyə"
    default: return level || "-"
  }
}

function getLevelBadgeClass(level: string): string {
  switch (level) {
    case "JUNIOR": return "px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
    case "SENIOR": return "px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
    case "BOTH": return "px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full"
    default: return "px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full"
  }
}

function getStageBadgeClass(stage: string): string {
  return "px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full"
}
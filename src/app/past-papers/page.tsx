"use client";

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BrandLogo } from "@/components/BrandLogo"

type RFOYear = { id: string; year: number; label: string }
type RFOStage = { id: string; yearId: string; stage: string }
type PastPaper = {
  id: string
  title: string
  description: string | null
  year: number | null
  stage: string | null
  level: string
  resourceType: string
  fileUrl: string | null
}

export default function PastPapersPage() {
  const router = useRouter()
  const [years, setYears] = useState<RFOYear[]>([])
  const [stages, setStages] = useState<RFOStage[]>([])
  const [pastPapers, setPastPapers] = useState<PastPaper[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    yearId: "",
    stageId: "",
    level: "",
    search: "",
  })

  // Fetch years and stages
  useEffect(() => {
    const fetchYearsAndStages = async () => {
      setLoading(true)
      setError(null)
      try {
        // Fetch years with stages included
        const yearsResponse = await fetch("/api/rfo-years")
        if (!yearsResponse.ok) throw new Error("Failed to fetch years")
        const yearsData = await yearsResponse.json()
        setYears(yearsData)

        // Fetch all stages (we'll filter by yearId later)
        const stagesResponse = await fetch("/api/rfo-stages")
        if (!stagesResponse.ok) throw new Error("Failed to fetch stages")
        const stagesData = await stagesResponse.json()
        setStages(stagesData)
      } catch (err) {
        setError("Failed to load years and stages")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchYearsAndStages()
  }, [])

  // Fetch past papers based on filters
  useEffect(() => {
    const fetchPastPapers = async () => {
      setLoading(true)
      setError(null)
      try {
        const queryParams = new URLSearchParams()
        let yearValue = ""
        let stageValue = ""
        if (filters.yearId) {
          const selectedYear = years.find((year) => year.id === filters.yearId)
          yearValue = selectedYear ? selectedYear.year.toString() : ""
        }
        if (filters.stageId) {
          const selectedStage = stages.find((stage) => stage.id === filters.stageId)
          stageValue = selectedStage ? selectedStage.stage : ""
        }

        if (yearValue) queryParams.append("year", yearValue)
        if (stageValue) queryParams.append("stage", stageValue)
        queryParams.append("resourceType", "PAST_PAPER")
        if (filters.level) queryParams.append("level", filters.level)
        if (filters.search) queryParams.append("search", filters.search)

        const response = await fetch(`/api/resources?${queryParams.toString()}`)
        if (!response.ok) throw new Error("Failed to fetch past papers")
        const data = await response.json()
        setPastPapers(data)
      } catch (err) {
        setError("Failed to load past papers")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPastPapers()
  }, [years, stages, filters.yearId, filters.stageId, filters.level, filters.search])

  // Handle filter changes for year and stage (by ID)
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, yearId: e.target.value, stageId: "" })) // Reset stage when year changes
  }

  const handleStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, stageId: e.target.value }))
  }

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, level: e.target.value }))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }))
  }

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
              <button type="button" onClick={() => router.push("/")} className="text-gray-600 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-xl font-bold text-gray-800">Keçmiş RFO Məsələləri</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-gray-600">
              <Link href="/" className="hover:text-gray-900 transition-colors">Ana səhifə</Link>
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
            Azərbaycan Respublikası Fənn Olimpiadasının əvvəlki illərdə keçirilmiş fizika imtahanları
          </p>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative w-full md:w-64">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year-select">
                  İl
                </label>
                <select
                  id="year-select"
                  value={filters.yearId}
                  onChange={handleYearChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">İl seçin</option>
                  {years.map((year) => (
                    <option key={year.id} value={year.id}>
                      {year.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative w-full md:w-64">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stage-select">
                  Mərhələ
                </label>
                <select
                  id="stage-select"
                  value={filters.stageId}
                  onChange={handleStageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Mərhələ seçin</option>
                  {stages
                    .filter((stage) => !filters.yearId || stage.yearId === filters.yearId)
                    .map((stage) => (
                      <option key={stage.id} value={stage.id}>
                        {stage.stage}
                      </option>
                    ))}
                </select>
              </div>
              <div className="relative w-full md:w-64">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level-select">
                  Səviyyə
                </label>
                <select
                  id="level-select"
                  value={filters.level}
                  onChange={handleLevelChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Səviyyə seçin</option>
                  <option value="JUNIOR">Junior</option>
                  <option value="SENIOR">Senior</option>
                  <option value="BOTH">Hər iki səviyyə</option>
                </select>
              </div>
              <div className="relative w-full md:w-64">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="search-input">
                  Axtarış
                </label>
                <div className="flex items-center">
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Axtarış... başlıq, təsvir və s."
                    value={filters.search}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Past papers grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastPapers.length === 0 ? (
              <p className="text-center col-span-3 text-gray-500">
                Heç bir geçmiş məslə tapılmadı
              </p>
            ) : (
              pastPapers.map((paper) => (
                <div key={paper.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300">
                  <div className="p-6">
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        Geçmiş Məsələ
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      {paper.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {paper.description || ""}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {paper.year && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                          {paper.year}
                        </span>
                      )}
                      {paper.stage && (
                        <span className={getStageBadgeClass()}>
                          {paper.stage}
                        </span>
                      )}
                      {paper.level && (
                        <span className={getLevelBadgeClass(paper.level)}>
                          {getLevelLabel(paper.level)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <a
                        href={`/api/resources/${paper.id}/download`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 me-4"
                      >
                        PDF-ni Oxu
                      </a>
                      <a
                        href={`/api/resources/${paper.id}/download`}
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
  )
}

// Helper functions
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

function getStageBadgeClass(): string {
  return "px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full"
}
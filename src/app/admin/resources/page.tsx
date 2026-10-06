"use client";

import { useState, useEffect } from "react"

type ResourceRow = {
  id: string
  title: string
  description: string | null
  fileUrl: string | null
  thumbnailUrl: string | null
  category: string
  topic: string | null
  level: string
  resourceType: string
  year: number | null
  tags: string[] | string | null
}

export default function AdminResources() {
  const [resources, setResources] = useState<ResourceRow[]>([])
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    category: "",
    level: "",
    resourceType: "",
    search: "",
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"add" | "edit">("add")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fileUrl: "",
    thumbnailUrl: "",
    category: "",
    topic: "",
    level: "JUNIOR",
    resourceType: "PDF",
    year: "",
    tags: "",
    file: null as File | null,
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  // Fetch resources from API
  const fetchResources = async () => {
    setLoading(true)
    setError(null)
    try {
      const queryParams = new URLSearchParams()
      if (filters.category) queryParams.append("category", filters.category)
      if (filters.level) queryParams.append("level", filters.level)
      if (filters.resourceType) queryParams.append("resourceType", filters.resourceType)
      if (filters.search) queryParams.append("search", filters.search)

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

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setLoading(true)
    setError(null)
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setError(null)
    setFilters(prev => ({ ...prev, search: e.target.value }))
  }

  // Open add modal
  const handleAddResource = () => {
    setModalType("add")
    setFormData({
      title: "",
      description: "",
      fileUrl: "",
      thumbnailUrl: "",
      category: "",
      topic: "",
      level: "JUNIOR",
      resourceType: "PDF",
      year: "",
      tags: "",
      file: null,
    })
    setEditingId(null)
    setModalOpen(true)
  }

  // Open edit modal
  const handleEditResource = (resource: ResourceRow) => {
    setModalType("edit")
    setFormData({
      title: resource.title || "",
      description: resource.description || "",
      fileUrl: resource.fileUrl || "",
      thumbnailUrl: resource.thumbnailUrl || "",
      category: resource.category || "",
      topic: resource.topic || "",
      level: resource.level || "JUNIOR",
      resourceType: resource.resourceType || "PDF",
      year: resource.year ? String(resource.year) : "",
      tags: Array.isArray(resource.tags) ? resource.tags.join(",") : (resource.tags || ""),
      file: null,
    })
    setEditingId(resource.id)
    setModalOpen(true)
  }

  // Handle form input change
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle form submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let fileUrl = formData.fileUrl
      if (formData.file) {
        const uploadData = new FormData()
        uploadData.append("file", formData.file)
        const uploadResponse = await fetch("/api/uploads", { method: "POST", body: uploadData })
        const uploadResult = await uploadResponse.json()
        if (!uploadResponse.ok) throw new Error(uploadResult.error || "Faylı yükləmək olmadı.")
        fileUrl = uploadResult.url
      }
      if (formData.resourceType !== "TEST" && !fileUrl.trim()) {
        throw new Error("Fayl yükləyin və ya fayl keçidi daxil edin.")
      }
      const resourceData = {
        ...formData,
        file: undefined,
        fileUrl,
        year: formData.year ? parseInt(formData.year) : undefined,
        tags: formData.tags.split(",").map((tag: string) => tag.trim()).filter((tag: string) => tag !== ""),
      }

      let response
      if (modalType === "add") {
        response = await fetch("/api/resources", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(resourceData),
        })
      } else if (modalType === "edit" && editingId) {
        response = await fetch(`/api/resources/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(resourceData),
        })
      }

      if (!response) throw new Error("Resursu saxlamaq olmadı.")
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Resursu saxlamaq olmadı.")
      setModalOpen(false)
      fetchResources() // Refresh the list
    } catch (err) {
      console.error(err)
      alert(err instanceof Error ? err.message : "Resursu saxlamaq olmadı.")
    }
  }

  // Handle delete resource
  const handleDeleteResource = async (id: string) => {
    if (!window.confirm("Bu resursu silmək istədiyinizdən əminsiniz?")) return
    try {
      const response = await fetch(`/api/resources/${id}`, {
        method: "DELETE",
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Resursu silmək olmadı.")
      fetchResources() // Refresh the list
    } catch (err) {
      console.error(err)
      alert(err instanceof Error ? err.message : "Resursu silmək olmadı.")
    }
  }

  useEffect(() => {
    fetch("/api/categories?type=TOPIC")
      .then(async (response) => {
        if (!response.ok) throw new Error("Kateqoriyaları yükləmək olmadı.")
        setCategories(await response.json())
      })
      .catch((reason: unknown) => console.error("Error fetching resource categories:", reason))
  }, [])

  // Refetch when filters change
  useEffect(() => {
    let active = true
    const queryParams = new URLSearchParams()
    if (filters.category) queryParams.append("category", filters.category)
    if (filters.level) queryParams.append("level", filters.level)
    if (filters.resourceType) queryParams.append("resourceType", filters.resourceType)
    if (filters.search) queryParams.append("search", filters.search)

    fetch(`/api/resources?${queryParams.toString()}`)
      .then(async (response) => {
        if (!response.ok) throw new Error("Failed to fetch resources")
        return response.json()
      })
      .then((data) => {
        if (active) setResources(data)
      })
      .catch((reason: unknown) => {
        if (!active) return
        setError("Failed to load resources")
        console.error(reason)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [filters.category, filters.level, filters.resourceType, filters.search])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Resurslar İdarəetməsi
        </h2>
        <button
          onClick={handleAddResource}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors"
        >
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
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Kateqorija seçin</option>
              <option value="mexanika">Mexanika</option>
              <option value="elektrik">Elektrik</option>
              <option value="termodinamika">Termodinamika</option>
              <option value="optika">Optika</option>
              <option value="maqnetizm">Maqnetizm</option>
              {categories
                .filter((category) => !["mexanika", "elektrik", "termodinamika", "optika", "maqnetizm"].includes(category.name))
                .map((category) => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
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
            <select
              name="resourceType"
              value={filters.resourceType}
              onChange={handleFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Resurs növü seçin</option>
              <option value="BOOK">Kitab</option>
              <option value="PDF">PDF</option>
              <option value="VIDEO">Video dərs</option>
              <option value="TEST">Test/imtahan</option>
              <option value="ARTICLE">Məqalə</option>
              <option value="OTHER">Digər</option>
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
                  Səviyyə
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                  Növ
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                  İl
                </th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-600">
                  Əməliyyatlar
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center">
                    Yüklənir...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-red-600">
                    {error}
                  </td>
                </tr>
              ) : resources.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    Heç bir resurs tapılmadı
                  </td>
                </tr>
              ) : (
                resources.map((resource) => (
                  <tr key={resource.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-800 flex items-center justify-center rounded-full">
                          {getResourceIcon(resource.resourceType)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{resource.title}</h3>
                          <p className="text-sm text-gray-500">{resource.description || ""}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {getCategoryLabel(resource.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={getLevelBadgeClass(resource.level)}>
                        {getLevelLabel(resource.level)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                        {getResourceTypeLabel(resource.resourceType)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{resource.year || ""}</span>
                    </td>
                    <td className="text-center px-6 py-4 space-x-3">
                      <button
                        onClick={() => handleEditResource(resource)}
                        className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100"
                      >
                        Redaktə
                      </button>
                      <button
                        onClick={() => handleDeleteResource(resource.id)}
                        className="px-3 py-1 bg-red-50 text-red-600 text-xs rounded hover:bg-red-100"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for adding/editing resource */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {modalType === "add" ? "Yeni Resurs Əlavə Et" : "Resursu Redaktə Et"}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="modal-title" className="block text-sm font-medium text-gray-700 mb-2">
                  Başlıq
                </label>
                <input
                  id="modal-title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="modal-description" className="block text-sm font-medium text-gray-700 mb-2">
                  Tavsif
                </label>
                <textarea
                  id="modal-description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="modal-fileUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  File URL
                </label>
                <input
                  id="modal-fileUrl"
                  name="fileUrl"
                  type="text"
                  value={formData.fileUrl}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/file.pdf"
                />
              </div>
              <div>
                <label htmlFor="modal-thumbnailUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail URL (optional)
                </label>
                <input
                  id="modal-thumbnailUrl"
                  name="thumbnailUrl"
                  type="text"
                  value={formData.thumbnailUrl}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="modal-category" className="block text-sm font-medium text-gray-700 mb-2">
                  Kateqorija
                </label>
                <select
                  id="modal-category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Kateqorija seçin</option>
                  <option value="mexanika">Mexanika</option>
                  <option value="elektrik">Elektrik</option>
                  <option value="termodinamika">Termodinamika</option>
                  <option value="optika">Optika</option>
                  <option value="maqnetizm">Maqnetizm</option>
                  {categories
                    .filter((category) => !["mexanika", "elektrik", "termodinamika", "optika", "maqnetizm"].includes(category.name))
                    .map((category) => (
                      <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="modal-topic" className="block text-sm font-medium text-gray-700 mb-2">
                  Mövzu (optional)
                </label>
                <input
                  id="modal-topic"
                  name="topic"
                  type="text"
                  value={formData.topic}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-3">
                <div>
                  <label htmlFor="modal-level" className="block text-sm font-medium text-gray-700 mb-2">
                    Səviyyə
                  </label>
                  <select
                    id="modal-level"
                    name="level"
                    required
                    value={formData.level}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="JUNIOR">Junior</option>
                    <option value="SENIOR">Senior</option>
                    <option value="BOTH">Hər iki səviyyə</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="modal-resourceType" className="block text-sm font-medium text-gray-700 mb-2">
                    Resurs növü
                  </label>
                  <select
                    id="modal-resourceType"
                    name="resourceType"
                    required
                    value={formData.resourceType}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="BOOK">Kitab</option>
                    <option value="PDF">PDF</option>
                    <option value="VIDEO">Video dərs</option>
                    <option value="TEST">Test/imtahan</option>
                    <option value="ARTICLE">Məqalə</option>
                    <option value="OTHER">Digər</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="modal-year" className="block text-sm font-medium text-gray-700 mb-2">
                  İl (optional)
                </label>
                <input
                  id="modal-year"
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="2024"
                />
              </div>
              <div>
                <label htmlFor="modal-tags" className="block text-sm font-medium text-gray-700 mb-2">
                  Etiketlər (comma-separated, optional)
                </label>
                <input
                  id="modal-tags"
                  name="tags"
                  type="text"
                  value={formData.tags}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="mexanika, junior, 2024"
                />
              </div>
              <div>
                <label htmlFor="modal-file" className="block text-sm font-medium text-gray-700 mb-2">
                  Fayl yüklə (optional)
                </label>
                <input
                  id="modal-file"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.txt,.mp4"
                  onChange={(e) => setFormData((prev) => ({ ...prev, file: e.target.files?.[0] || null }))}
                  className="w-full rounded border p-3"
                />
                <p className="mt-1 text-xs text-gray-500">Maksimum 10 MB. Xarici keçid də istifadə edə bilərsiniz.</p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Ləğv Et
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded hover:from-blue-700 hover:to-indigo-700"
                >
                  {modalType === "add" ? "Əlavə Et" : "Yadda Saxla"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

// Helper functions
function getResourceIcon(type: string): React.JSX.Element {
  switch (type) {
    case "BOOK": return <span role="img" aria-label="kitab">📚</span>;
    case "PDF": return <span role="img" aria-label="PDF">📄</span>;
    case "VIDEO": return <span role="img" aria-label="video">🎥</span>;
    case "TEST": return <span role="img" aria-label="test">📝</span>;
    case "ARTICLE": return <span role="img" aria-label="məqalə">📰</span>;
    default: return <span role="img" aria-label="bağla">📎</span>;
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

function getResourceTypeLabel(type: string): string {
  switch (type) {
    case "BOOK": return "Kitab"
    case "PDF": return "PDF"
    case "VIDEO": return "Video dərs"
    case "TEST": return "Test/imtahan"
    case "ARTICLE": return "Məqalə"
    case "OTHER": return "Digər"
    default: return type || "-"
  }
}
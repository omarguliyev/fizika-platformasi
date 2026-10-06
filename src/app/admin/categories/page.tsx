"use client";

import { useState, useEffect } from "react"

type CategoryRow = {
  id: string
  name: string
  type: string
  description: string | null
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<CategoryRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    type: "",
    search: "",
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"add" | "edit">("add")
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  // Fetch categories from API
  const fetchCategories = async () => {
    setLoading(true)
    setError(null)
    try {
      const queryParams = new URLSearchParams()
      if (filters.type) queryParams.append("type", filters.type)
      if (filters.search) queryParams.append("search", filters.search)

      const response = await fetch(`/api/categories?${queryParams.toString()}`)
      if (!response.ok) throw new Error("Failed to fetch categories")
      const data = await response.json()
      setCategories(data)
    } catch (err) {
      setError("Failed to load categories")
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
  const handleAddCategory = () => {
    setModalType("add")
    setFormData({
      name: "",
      type: "",
      description: "",
    })
    setEditingId(null)
    setModalOpen(true)
  }

  // Open edit modal
  const handleEditCategory = (category: CategoryRow) => {
    setModalType("edit")
    setFormData({
      name: category.name || "",
      type: category.type || "",
      description: category.description || "",
    })
    setEditingId(category.id)
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
      const categoryData = {
        ...formData,
      }

      let response
      if (modalType === "add") {
        response = await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(categoryData),
        })
      } else if (modalType === "edit" && editingId) {
        response = await fetch(`/api/categories/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(categoryData),
        })
      }

      if (!response || !response.ok) throw new Error("Failed to save category")
      await response.json()
      setModalOpen(false)
      fetchCategories() // Refresh the list
    } catch (err) {
      console.error(err)
      alert("Failed to save category")
    }
  }

  // Handle delete category
  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm("Bu kateqoriyani silmək istədiyinizdən əminsiniz?")) return
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete category")
      await response.json()
      fetchCategories() // Refresh the list
    } catch (err) {
      console.error(err)
      alert("Failed to delete category")
    }
  }

  // Refetch when filters change
  useEffect(() => {
    let active = true
    const queryParams = new URLSearchParams()
    if (filters.type) queryParams.append("type", filters.type)
    if (filters.search) queryParams.append("search", filters.search)

    fetch(`/api/categories?${queryParams.toString()}`)
      .then(async (response) => {
        if (!response.ok) throw new Error("Failed to fetch categories")
        return response.json()
      })
      .then((data) => {
        if (active) setCategories(data)
      })
      .catch((reason: unknown) => {
        if (!active) return
        setError("Failed to load categories")
        console.error(reason)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [filters.type, filters.search])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Kateqoriyalar İdarəetməsi
        </h2>
        <button
          onClick={handleAddCategory}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors"
        >
          Yeni Kateqoriya Əlavə Et
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
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tip seçin</option>
              <option value="TOPIC">Mövzu</option>
              <option value="RESOURCE_TYPE">Resurs növü</option>
              <option value="LEVEL">Səviyyə</option>
              <option value="OTHER">Digər</option>
            </select>
          </div>
        </div>
      </div>

      {/* Categories table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                  Kateqoriya Adı
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                  Tip
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                  Tavsif
                </th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-600">
                  Əməliyyatlar
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center">
                    Yüklənir...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-red-600">
                    {error}
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    Heç bir kateqoriya tapılmadı
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-800 flex items-center justify-center rounded-full">
                          {getCategoryIcon(category.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{category.name}</h3>
                          <p className="text-sm text-gray-500">{category.description || ""}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {getCategoryTypeLabel(category.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {category.description ? (
                        <span className="text-sm text-gray-600">{category.description}</span>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                    <td className="text-center px-6 py-4 space-x-3">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100"
                      >
                        Redaktə
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
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

      {/* Modal for adding/editing category */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {modalType === "add" ? "Yeni Kateqoriya Əlavə Et" : "Kateqoriyanı Redaktə Et"}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="modal-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Kateqoriya Adı
                </label>
                <input
                  id="modal-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="modal-type" className="block text-sm font-medium text-gray-700 mb-2">
                  Tip
                </label>
                <select
                  id="modal-type"
                  name="type"
                  required
                  value={formData.type}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tip seçin</option>
                  <option value="TOPIC">Mövzu</option>
                  <option value="RESOURCE_TYPE">Resurs növü</option>
                  <option value="LEVEL">Səviyyə</option>
                  <option value="OTHER">Digər</option>
                </select>
              </div>
              <div>
                <label htmlFor="modal-description" className="block text-sm font-medium text-gray-700 mb-2">
                  Tavsif (optional)
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
function getCategoryIcon(type: string): React.JSX.Element {
  switch (type) {
    case "TOPIC": return <span role="img" aria-label="mövzu">📚</span>;
    case "RESOURCE_TYPE": return <span role="img" aria-label="resurs növü">📂</span>;
    case "LEVEL": return <span role="img" aria-label="səviyyə">📊</span>;
    default: return <span role="img" aria-label="etichet">🏷️</span>;
  }
}

function getCategoryTypeLabel(type: string): string {
  switch (type) {
    case "TOPIC": return "Mövzu"
    case "RESOURCE_TYPE": return "Resurs növü"
    case "LEVEL": return "Səviyyə"
    case "OTHER": return "Digər"
    default: return type || "-"
  }
}
"use client";

import { useState, useEffect } from "react"

type RFOFile = { name: string; url: string; type: string }
type RFOStage = {
  id: string
  yearId: string
  stage: string
  description: string | null
  isActive: boolean
}
type RFOYear = {
  id: string
  year: number
  label: string
  files: string | null
  isActive: boolean
  stages: RFOStage[]
}

export default function AdminRFOPosts() {
  const [years, setYears] = useState<RFOYear[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"addYear" | "editYear" | "addStage" | "editStage">("addYear")
  const [formData, setFormData] = useState({
    year: "",
    label: "",
    isActive: true,
    files: "[]", // JSON array of file objects
  })
  const [stageFormData, setStageFormData] = useState({
    yearId: "",
    stage: "",
    description: "",
    isActive: true,
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingStageId, setEditingStageId] = useState<string | null>(null)

  // Fetch years from API
  const fetchYears = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/rfo-years`)
      if (!response.ok) throw new Error("Failed to fetch RFO years")
      const data = await response.json()
      setYears(data)
    } catch (err) {
      setError("Failed to load RFO years")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Handle adding a year
  const handleAddYear = () => {
    setModalType("addYear")
    setFormData({
      year: "",
      label: "",
      isActive: true,
      files: "[]",
    })
    setEditingId(null)
    setModalOpen(true)
  }

  // Handle editing a year
  const handleEditYear = (year: RFOYear) => {
    setModalType("editYear")
    setFormData({
      year: String(year.year),
      label: year.label || "",
      isActive: year.isActive ?? true,
      files: year.files || "[]",
    })
    setEditingId(year.id)
    setModalOpen(true)
  }

  // Handle adding a stage
  const handleAddStage = (yearId: string) => {
    setModalType("addStage")
    setStageFormData({
      yearId,
      stage: "",
      description: "",
      isActive: true,
    })
    setEditingStageId(null)
    setModalOpen(true)
  }

  // Handle editing a stage
  const handleEditStage = (stage: RFOStage) => {
    setModalType("editStage")
    setStageFormData({
      yearId: stage.yearId,
      stage: stage.stage || "",
      description: stage.description || "",
      isActive: stage.isActive ?? true,
    })
    setEditingStageId(stage.id)
    setModalOpen(true)
  }

  // Handle form input change for year
  const handleYearFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle form input change for stage
  const handleStageFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setStageFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle year form submit
  const handleYearFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const yearData = {
        ...formData,
        year: parseInt(formData.year),
        label: formData.label.trim() || formData.year,
        files: JSON.stringify(JSON.parse(formData.files)),
      }

      let response: Response | null = null
      if (modalType === "addYear") {
        response = await fetch("/api/rfo-years", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            year: yearData.year,
            label: yearData.label,
            isActive: yearData.isActive,
            files: yearData.files,
          }),
        })
      } else if (modalType === "editYear" && editingId) {
        response = await fetch(`/api/rfo-years/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            year: yearData.year,
            label: yearData.label,
            isActive: yearData.isActive,
            files: yearData.files,
          }),
        })
      }

      if (!response) {
        throw new Error("Invalid operation")
      }
      if (!response.ok) throw new Error("Failed to save year")
      await response.json()
      setModalOpen(false)
      fetchYears() // Refresh the list
    } catch (err) {
      console.error(err)
      alert("Failed to save year")
    }
  }

  // Handle stage form submit
  const handleStageFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const stageData = {
        ...stageFormData,
      }

      let response: Response | null = null
      if (modalType === "addStage") {
        response = await fetch("/api/rfo-stages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            yearId: stageData.yearId,
            stage: stageData.stage,
            description: stageData.description,
            isActive: stageData.isActive,
          }),
        })
      } else if (modalType === "editStage" && editingStageId) {
        response = await fetch(`/api/rfo-stages/${editingStageId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            yearId: stageData.yearId,
            stage: stageData.stage,
            description: stageData.description,
            isActive: stageData.isActive,
          }),
        })
      }

      if (!response) {
        throw new Error("Invalid operation")
      }
      if (!response.ok) throw new Error("Failed to save stage")
      await response.json()
      setModalOpen(false)
      fetchYears() // Refresh the list
    } catch (err) {
      console.error(err)
      alert("Failed to save stage")
    }
  }

  // Handle delete year
  const handleDeleteYear = async (id: string) => {
    if (!window.confirm("Bu ili silmək istədiyinizdən əminsiniz? Bu ili associés bütün mərhələlər də silinəcək.")) return
    try {
      const response = await fetch(`/api/rfo-years/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete year")
      await response.json()
      fetchYears() // Refresh the list
    } catch (err) {
      console.error(err)
      alert("Failed to delete year")
    }
  }

  // Handle delete stage
  const handleDeleteStage = async (id: string) => {
    if (!window.confirm("Bu mərhələni silmək istədiyinizdən əminsiniz?")) return
    try {
      const response = await fetch(`/api/rfo-stages/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete stage")
      await response.json()
      fetchYears() // Refresh the list
    } catch (err) {
      console.error(err)
      alert("Failed to delete stage")
    }
  }

  // Initial fetch
  useEffect(() => {
    let active = true
    fetch("/api/rfo-years")
      .then(async (response) => {
        if (!response.ok) throw new Error("Failed to fetch RFO years")
        return response.json()
      })
      .then((data) => {
        if (active) setYears(data)
      })
      .catch((reason: unknown) => {
        if (!active) return
        setError("Failed to load RFO years")
        console.error(reason)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          RFO Məsələləri İdarəetməsi
        </h2>
        <div className="flex space-x-3">
          <button
            onClick={handleAddYear}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors"
          >
            Yeni İl Əlavə Et
          </button>
        </div>
      </div>

      {/* Years table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                  İl
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                  Mərhələlər
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                  Fayllar
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
              ) : years.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    Heç bir il tapılmadı
                  </td>
                </tr>
              ) : (
                years.map((year) => (
                  <tr key={year.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-800 flex items-center justify-center rounded-full">
                          📅
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{year.year}</h3>
                          <p className="text-sm text-gray-500">{year.label}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {year.stages.length > 0 ? (
                          year.stages.map((stage) => (
                            <div key={stage.id} className="mb-1 flex items-center gap-2">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                {stage.stage}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleEditStage(stage)}
                                className="text-xs text-blue-600 hover:text-blue-800 underline"
                              >
                                Redaktə
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteStage(stage.id)}
                                className="text-xs text-red-600 hover:text-red-800 underline"
                              >
                                Sil
                              </button>
                            </div>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">Mərhəla yoxdur</span>
                        )}
                        {/* Button to add stage */}
                        <button
                          onClick={() => handleAddStage(year.id)}
                          className="text-xs text-blue-600 hover:text-blue-800 underline"
                        >
                          Mərhəla Əlavə Et
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {parseYearFiles(year.files).length > 0 ? (
                          parseYearFiles(year.files).map((file, index) => (
                            <span key={`${file.url}-${index}`} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded mr-1 mb-1">
                              {file.name || `Fayl ${index + 1}`}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">Fayl yoxdur</span>
                        )}
                        {/* Button to add file */}
                        <button
                          onClick={() => {
                            // We'll open a modal to add file URL - for simplicity, we'll just prompt
                            const fileName = prompt("Fayl adını daxil edin (məsələn: imtahan.pdf):")
                            const fileUrl = prompt("Fayl URL-ini daxil edin:")
                            const fileType = prompt("Fayl növünü daxil edin (PDF, VIDEO, vb.):")
                            if (fileName && fileUrl && fileType) {
                              const newFile = { name: fileName, url: fileUrl, type: fileType }
                              const currentFiles = parseYearFiles(year.files)
                              const updatedFiles = [...currentFiles, newFile]
                              // Update the year's files via API
                              fetch(`/api/rfo-years/${year.id}`, {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  files: updatedFiles,
                                }),
                              }).then(() => {
                                fetchYears() // Refresh
                              }).catch(err => {
                                console.error(err)
                                alert("Faylav əlavə edilə bilmədi")
                              })
                            }
                          }}
                          className="text-xs text-blue-600 hover:text-blue-800 underline"
                        >
                          Fayl Əlavə Et
                        </button>
                      </div>
                    </td>
                    <td className="text-center px-6 py-4 space-x-3">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEditYear(year)}
                          className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100"
                        >
                          Redaktə
                        </button>
                        <button
                          onClick={() => handleDeleteYear(year.id)}
                          className="px-3 py-1 bg-red-50 text-red-600 text-xs rounded hover:bg-red-100"
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for adding/editing year */}
      {modalOpen && modalType.startsWith("addYear") && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Yeni İl Əlavə Et
            </h2>
            <form onSubmit={handleYearFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="modal-year" className="block text-sm font-medium text-gray-700 mb-2">
                  İl
                </label>
                <input
                  id="modal-year"
                  name="year"
                  type="number"
                  required
                  value={formData.year}
                  onChange={handleYearFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="modal-label" className="block text-sm font-medium text-gray-700 mb-2">
                  Etiket
                </label>
                <input
                  id="modal-label"
                  name="label"
                  type="text"
                  value={formData.label}
                  onChange={handleYearFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="modal-files" className="block text-sm font-medium text-gray-700 mb-2">
                  Fayllar (JSON array, optional)
                </label>
                <textarea
                  id="modal-files"
                  name="files"
                  rows={3}
                  value={formData.files}
                  onChange={handleYearFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder='[{"name": "imtahan.pdf", "url": "https://example.com/imtahan.pdf", "type": "PDF"}]'
                />
              </div>
              <div>
                <label htmlFor="modal-isActive" className="block text-sm font-medium text-gray-700 mb-2">
                  Aktiv
                </label>
                <input
                  id="modal-isActive"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
                  Əlavə Et
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal for editing year */}
      {modalOpen && modalType === "editYear" && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              İli Redaktə Et
            </h2>
            <form onSubmit={handleYearFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="modal-year" className="block text-sm font-medium text-gray-700 mb-2">
                  İl
                </label>
                <input
                  id="modal-year"
                  name="year"
                  type="number"
                  required
                  value={formData.year}
                  onChange={handleYearFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="modal-label" className="block text-sm font-medium text-gray-700 mb-2">
                  Etiket
                </label>
                <input
                  id="modal-label"
                  name="label"
                  type="text"
                  value={formData.label}
                  onChange={handleYearFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="modal-files" className="block text-sm font-medium text-gray-700 mb-2">
                  Fayllar (JSON array, optional)
                </label>
                <textarea
                  id="modal-files"
                  name="files"
                  rows={3}
                  value={formData.files}
                  onChange={handleYearFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder='[{"name": "imtahan.pdf", "url": "https://example.com/imtahan.pdf", "type": "PDF"}]'
                />
              </div>
              <div>
                <label htmlFor="modal-isActive" className="block text-sm font-medium text-gray-700 mb-2">
                  Aktiv
                </label>
                <input
                  id="modal-isActive"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
                  Yadda Saxla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal for adding stage */}
      {modalOpen && modalType === "addStage" && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Yeni Mərhəla Əlavə Et
            </h2>
            <form onSubmit={handleStageFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="modal-stage" className="block text-sm font-medium text-gray-700 mb-2">
                  Mərhəla
                </label>
                <input
                  id="modal-stage"
                  name="stage"
                  type="text"
                  required
                  value={stageFormData.stage}
                  onChange={handleStageFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="modal-description" className="block text-sm font-medium text-gray-700 mb-2">
                  Tavsif (optional)
                </label>
                <textarea
                  id="modal-description"
                  name="description"
                  rows={3}
                  value={stageFormData.description}
                  onChange={handleStageFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="modal-isActive" className="block text-sm font-medium text-gray-700 mb-2">
                  Aktiv
                </label>
                <input
                  id="modal-isActive"
                  type="checkbox"
                  checked={stageFormData.isActive}
                  onChange={e => setStageFormData({ ...stageFormData, isActive: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
                  Əlavə Et
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal for editing stage */}
      {modalOpen && modalType === "editStage" && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Mərhələni Redaktə Et
            </h2>
            <form onSubmit={handleStageFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="modal-stage" className="block text-sm font-medium text-gray-700 mb-2">
                  Mərhəla
                </label>
                <input
                  id="modal-stage"
                  name="stage"
                  type="text"
                  value={stageFormData.stage}
                  onChange={handleStageFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="modal-description" className="block text-sm font-medium text-gray-700 mb-2">
                  Tavsif (optional)
                </label>
                <textarea
                  id="modal-description"
                  name="description"
                  rows={3}
                  value={stageFormData.description}
                  onChange={handleStageFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="modal-isActive" className="block text-sm font-medium text-gray-700 mb-2">
                  Aktiv
                </label>
                <input
                  id="modal-isActive"
                  type="checkbox"
                  checked={stageFormData.isActive}
                  onChange={e => setStageFormData({ ...stageFormData, isActive: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
                  Yadda Saxla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function parseYearFiles(value: string | null): RFOFile[] {
  if (!value) return []
  try {
    const files: unknown = JSON.parse(value)
    if (!Array.isArray(files)) return []
    return files.filter((file): file is RFOFile =>
      typeof file === "object" &&
      file !== null &&
      "name" in file &&
      typeof file.name === "string" &&
      "url" in file &&
      typeof file.url === "string" &&
      "type" in file &&
      typeof file.type === "string"
    )
  } catch {
    return []
  }
}
"use client";

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { BrandLogo } from "@/components/BrandLogo"

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await signIn("admin-credentials", {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        setError("E-poçt və ya şifrə yanlışdır.")
      } else if (result?.ok) {
        const callbackUrl = new URLSearchParams(window.location.search).get("callbackUrl")
        const destination = callbackUrl?.startsWith("/") &&
          !callbackUrl.startsWith("//") &&
          !callbackUrl.includes("\\")
          ? callbackUrl
          : "/admin"
        router.push(destination)
        router.refresh()
      }
    } catch (err) {
      console.error("Admin sign-in failed:", err)
      setError("Gözlənilməz xəta baş verdi.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-6">
        <div className="text-center">
          <BrandLogo showName imageClassName="h-12 w-12" className="mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">
            Admin Panel Girişi
          </h2>
          <p className="text-gray-600">
            RFO Fizika Platformunun administrator panelinə xoş gəldiniz
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              E-poçt
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="admin@rfo-fizika.az"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Şifrə
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={loading}
              />
              <span className="ml-2">Məni yadda saxla</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
              Şifrəni unudubsız?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors"
          >
            {loading ? "Daxil olundu..." : "Daxil ol"}
          </button>
        </form>
      </div>
    </div>
  )
}
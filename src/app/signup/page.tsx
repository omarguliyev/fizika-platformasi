"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BrandLogo } from "@/components/BrandLogo"

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setError("")
    if (form.password !== form.confirmPassword) {
      setError("Şifrələr uyğun gəlmir.")
      return
    }
    setLoading(true)
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || "Qeydiyyat baş tutmadı.")
        return
      }
      const callbackUrl = new URLSearchParams(window.location.search).get("callbackUrl")
      const loginUrl = new URLSearchParams({ registered: "1" })
      if (
        callbackUrl?.startsWith("/") &&
        !callbackUrl.startsWith("//") &&
        !callbackUrl.includes("\\")
      ) {
        loginUrl.set("callbackUrl", callbackUrl)
      }
      router.push(`/login?${loginUrl.toString()}`)
    } catch {
      setError("Serverə qoşulmaq mümkün olmadı.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form onSubmit={submit} className="w-full max-w-md space-y-5 rounded-xl bg-white p-8 shadow">
        <BrandLogo showName imageClassName="h-10 w-10" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Qeydiyyatdan keç</h1>
          <p className="mt-1 text-sm text-gray-600">RFO Fizika platformasında hesab yaradın.</p>
        </div>
        {error && <p className="rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <label className="block text-sm font-medium">İstifadəçi adı<input required minLength={3} maxLength={32} value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="mt-1 w-full rounded border p-3" /></label>
        <label className="block text-sm font-medium">E-poçt<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 w-full rounded border p-3" /></label>
        <label className="block text-sm font-medium">Şifrə<input required minLength={8} type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="mt-1 w-full rounded border p-3" /></label>
        <label className="block text-sm font-medium">Şifrəni təsdiqləyin<input required type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className="mt-1 w-full rounded border p-3" /></label>
        <button disabled={loading} className="w-full rounded bg-blue-600 p-3 font-medium text-white disabled:opacity-50">{loading ? "Yaradılır..." : "Qeydiyyatdan keç"}</button>
        <p className="text-center text-sm"><Link className="text-blue-600 hover:underline" href="/login" onClick={(event) => {
          const callbackUrl = new URLSearchParams(window.location.search).get("callbackUrl")
          if (callbackUrl) {
            event.preventDefault()
            router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`)
          }
        }}>Artıq hesabınız var? Daxil olun</Link></p>
      </form>
    </main>
  )
}

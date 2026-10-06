"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BrandLogo } from "@/components/BrandLogo"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError("")
    try {
      const result = await signIn("user-credentials", { email, password, redirect: false })
      if (!result?.ok) {
        setError("E-poçt və ya şifrə yanlışdır.")
        return
      }

      const callbackUrl = new URLSearchParams(window.location.search).get("callbackUrl")
      const destination = callbackUrl?.startsWith("/") &&
        !callbackUrl.startsWith("//") &&
        !callbackUrl.includes("\\")
        ? callbackUrl
        : "/"
      window.location.assign(destination)
    } catch (reason) {
      console.error("User sign-in failed:", reason)
      setError("Daxil olmaq mümkün olmadı. Bir az sonra yenidən cəhd edin.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form onSubmit={submit} className="w-full max-w-md space-y-5 rounded-xl bg-white p-8 shadow">
        <BrandLogo showName imageClassName="h-10 w-10" />
        <div><h1 className="text-2xl font-bold text-gray-900">Daxil ol</h1><p className="mt-1 text-sm text-gray-600">Hesabınıza daxil olun.</p></div>
        {error && <p className="rounded bg-blue-50 p-3 text-sm text-blue-700">{error}</p>}
        <label className="block text-sm font-medium">E-poçt<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded border p-3" /></label>
        <label className="block text-sm font-medium">Şifrə<input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded border p-3" /></label>
        <button disabled={loading} className="w-full rounded bg-blue-600 p-3 font-medium text-white disabled:opacity-50">{loading ? "Daxil olunur..." : "Daxil ol"}</button>
        <p className="text-center text-sm"><Link className="text-blue-600 hover:underline" href="/signup" onClick={(event) => {
          const callbackUrl = new URLSearchParams(window.location.search).get("callbackUrl")
          if (callbackUrl) {
            event.preventDefault()
            router.push(`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`)
          }
        }}>Hesabınız yoxdur? Qeydiyyatdan keçin</Link></p>
      </form>
    </main>
  )
}

"use client"

import { useEffect, useState } from "react"

type User = {
  id: string
  username: string
  email: string
  createdAt: string
  lastActivityAt: string | null
  _count: { attempts: number }
  attempts: { score: number }[]
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/users/admin")
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) throw new Error(data.error || "İstifadəçiləri yükləmək olmadı.")
        setUsers(data)
      })
      .catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Xəta baş verdi."))
  }, [])

  return (
    <section className="space-y-6">
      <div><h2 className="text-2xl font-bold">İstifadəçilər</h2><p className="text-gray-600">Qeydiyyatdan keçmiş tələbələr və onların əsas statistikaları.</p></div>
      {error && <p className="rounded bg-red-50 p-3 text-red-700">{error}</p>}
      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50"><tr><th className="px-4 py-3 text-left">İstifadəçi adı</th><th className="px-4 py-3 text-left">E-poçt</th><th className="px-4 py-3 text-left">Qeydiyyat</th><th className="px-4 py-3 text-left">Son aktivlik</th><th className="px-4 py-3 text-left">Test cəhdləri</th><th className="px-4 py-3 text-left">Son xal</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => <tr key={user.id}><td className="px-4 py-3 font-medium">{user.username}</td><td className="px-4 py-3">{user.email}</td><td className="px-4 py-3">{new Date(user.createdAt).toLocaleDateString("az-AZ")}</td><td className="px-4 py-3">{user.lastActivityAt ? new Date(user.lastActivityAt).toLocaleDateString("az-AZ") : "—"}</td><td className="px-4 py-3">{user._count.attempts}</td><td className="px-4 py-3">{user.attempts[0]?.score ?? "—"}</td></tr>)}
            {users.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">Qeydiyyatdan keçmiş istifadəçi yoxdur.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  )
}

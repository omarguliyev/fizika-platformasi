"use client"

import { signOut } from "next-auth/react"

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="hover:text-gray-900 transition-colors"
    >
      Çıxış
    </button>
  )
}

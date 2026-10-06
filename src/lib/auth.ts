import { getServerSession } from "next-auth"
import type { Session } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function getAuthSession(): Promise<Session | null> {
  return getServerSession(authOptions)
}

export async function requireAdminSession(): Promise<Session> {
  const session = await getAuthSession()
  if (!session?.user?.id || session.user.role !== "admin") {
    throw new Error("UNAUTHORIZED")
  }
  return session
}

export async function requireUserSession(): Promise<Session> {
  const session = await getAuthSession()
  if (!session?.user?.id || session.user.role !== "user") {
    throw new Error("UNAUTHORIZED")
  }
  return session
}

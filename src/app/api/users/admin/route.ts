import { NextResponse } from "next/server"
import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  const session = await getAuthSession()
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "İcazə yoxdur." }, { status: 403 })
  }
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      lastActivityAt: true,
      _count: { select: { attempts: true } },
      attempts: {
        select: { score: true },
        orderBy: { completedAt: "desc" },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(users)
}

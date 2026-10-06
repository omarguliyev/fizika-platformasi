import { NextRequest, NextResponse } from "next/server"
import type { Prisma } from "@prisma/client"
import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/prisma"

// GET /api/categories - list categories
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || undefined
    const search = searchParams.get("search") || undefined
    const session = await getAuthSession()
    const isAdmin = session?.user?.role === "admin"
    const where: Prisma.CategoryWhereInput = isAdmin ? {} : { isActive: true }
    if (type) where.type = type
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ]
    }

    const categories = await prisma.category.findMany({
      where,
      orderBy: { createdAt: "desc" },
      ...(!isAdmin
        ? { select: { id: true, name: true, type: true, description: true } }
        : {}),
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

// POST /api/categories - create a new category
export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession()
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "İcazə yoxdur." }, { status: 403 })
    }

    const body = await request.json()
    const { name, type, description } = body

    if (typeof name !== "string" || !name.trim() || typeof type !== "string" || !type.trim()) {
      return NextResponse.json(
        { error: "Ad və tip tələb olunur." },
        { status: 400 }
      )
    }

    const category = await prisma.category.create({
      data: {
        name: name.trim(),
        type: type.trim(),
        description: typeof description === "string" && description.trim() ? description.trim() : null,
        isActive: true,
      },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}

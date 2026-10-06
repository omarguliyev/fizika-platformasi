import { NextRequest, NextResponse } from "next/server"
import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAuthSession()
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "İcazə yoxdur." }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { name, type, description } = body
    if (typeof name !== "string" || !name.trim() || typeof type !== "string" || !type.trim()) {
      return NextResponse.json({ error: "Ad və tip tələb olunur." }, { status: 400 })
    }

    const { id } = await params
    const category = await prisma.category.update({
      where: { id },
      data: {
        name: name.trim(),
        type: type.trim(),
        description: typeof description === "string" && description.trim() ? description.trim() : null,
      },
    })
    return NextResponse.json(category)
  } catch (error) {
    console.error("Error updating category:", error)
    return NextResponse.json({ error: "Kateqoriyanı yeniləmək olmadı." }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAuthSession()
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "İcazə yoxdur." }, { status: 403 })
  }

  try {
    const { id } = await params
    await prisma.category.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting category:", error)
    return NextResponse.json({ error: "Kateqoriyanı silmək olmadı." }, { status: 500 })
  }
}

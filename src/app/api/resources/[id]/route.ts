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
    const {
      title,
      description,
      fileUrl,
      thumbnailUrl,
      category,
      topic,
      level,
      resourceType,
      year,
      stage,
      tags,
    } = body

    if (
      typeof title !== "string" || !title.trim() ||
      typeof category !== "string" || !category ||
      typeof level !== "string" || !level ||
      typeof resourceType !== "string" || !resourceType ||
      (resourceType !== "TEST" && (typeof fileUrl !== "string" || !fileUrl.trim()))
    ) {
      return NextResponse.json({ error: "Başlıq, kateqoriya, səviyyə, növ və fayl tələb olunur." }, { status: 400 })
    }

    const parsedYear = year ? Number.parseInt(String(year), 10) : null
    if (year && !Number.isInteger(parsedYear)) {
      return NextResponse.json({ error: "İl tam ədəd olmalıdır." }, { status: 400 })
    }

    const { id } = await params
    const resource = await prisma.resource.update({
      where: { id },
      data: {
        title: title.trim(),
        description: typeof description === "string" && description.trim() ? description.trim() : null,
        fileUrl: typeof fileUrl === "string" && fileUrl.trim() ? fileUrl.trim() : null,
        thumbnailUrl: typeof thumbnailUrl === "string" && thumbnailUrl.trim() ? thumbnailUrl.trim() : null,
        category,
        topic: typeof topic === "string" && topic.trim() ? topic.trim() : null,
        level,
        resourceType,
        year: parsedYear,
        stage: typeof stage === "string" && stage.trim() ? stage.trim() : null,
        tags: Array.isArray(tags) ? tags.join(",") : typeof tags === "string" ? tags : "",
      },
    })

    return NextResponse.json(resource)
  } catch (error) {
    console.error("Error updating resource:", error)
    return NextResponse.json({ error: "Resursu yeniləmək olmadı." }, { status: 500 })
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
    await prisma.resource.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting resource:", error)
    return NextResponse.json({ error: "Resursu silmək olmadı." }, { status: 500 })
  }
}

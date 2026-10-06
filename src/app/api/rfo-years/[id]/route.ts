import { NextRequest, NextResponse } from "next/server"
import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { parseRfoFiles } from "@/lib/rfo-files"

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
    const year = body.year === undefined ? undefined : Number.parseInt(String(body.year), 10)
    const files = parseRfoFiles(body.files)
    if (
      (year !== undefined && (!Number.isInteger(year) || year < 1)) ||
      files === null ||
      (body.label !== undefined && typeof body.label !== "string") ||
      (body.isActive !== undefined && typeof body.isActive !== "boolean")
    ) {
      return NextResponse.json({ error: "İl, etiket və fayllar düzgün göstərilməlidir." }, { status: 400 })
    }

    const { id } = await params
    const rfoYear = await prisma.rFOYear.update({
      where: { id },
      data: {
        year,
        label: typeof body.label === "string" && body.label.trim() ? body.label.trim() : undefined,
        isActive: body.isActive,
        files,
      },
    })
    return NextResponse.json(rfoYear)
  } catch (error) {
    console.error("Error updating RFO year:", error)
    return NextResponse.json({ error: "İli yeniləmək olmadı." }, { status: 500 })
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
    await prisma.$transaction([
      prisma.rFOStage.deleteMany({ where: { yearId: id } }),
      prisma.rFOYear.delete({ where: { id } }),
    ])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting RFO year:", error)
    return NextResponse.json({ error: "İli silmək olmadı." }, { status: 500 })
  }
}

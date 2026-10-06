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
    if (
      (body.yearId !== undefined && typeof body.yearId !== "string") ||
      (body.stage !== undefined && typeof body.stage !== "string") ||
      (body.description !== undefined && body.description !== null && typeof body.description !== "string") ||
      (body.isActive !== undefined && typeof body.isActive !== "boolean")
    ) {
      return NextResponse.json({ error: "Mərhələnin məlumatları düzgün göstərilməyib." }, { status: 400 })
    }

    const { id } = await params
    const rfoStage = await prisma.rFOStage.update({
      where: { id },
      data: {
        yearId: body.yearId || undefined,
        stage: typeof body.stage === "string" && body.stage.trim() ? body.stage.trim() : undefined,
        description: body.description === null
          ? null
          : typeof body.description === "string"
            ? body.description.trim() || null
            : undefined,
        isActive: body.isActive,
      },
    })
    return NextResponse.json(rfoStage)
  } catch (error) {
    console.error("Error updating RFO stage:", error)
    return NextResponse.json({ error: "Mərhələni yeniləmək olmadı." }, { status: 500 })
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
    await prisma.rFOStage.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting RFO stage:", error)
    return NextResponse.json({ error: "Mərhələni silmək olmadı." }, { status: 500 })
  }
}

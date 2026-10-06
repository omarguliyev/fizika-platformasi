import { NextRequest, NextResponse } from "next/server"
import type { Prisma } from "@prisma/client"
import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/prisma"

// GET /api/rfo-stages - list RFO stages with optional filtering by yearId
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const yearId = searchParams.get("yearId") || undefined
    const search = searchParams.get("search") || undefined
    const session = await getAuthSession()
    const isAdmin = session?.user?.role === "admin"
    const where: Prisma.RFOStageWhereInput = isAdmin
      ? {}
      : { isActive: true, year: { isActive: true } }
    if (yearId) where.yearId = yearId
    if (search) {
      where.OR = [
        { stage: { contains: search } },
        { description: { contains: search } },
      ]
    }

    const stages = isAdmin
      ? await prisma.rFOStage.findMany({
          where,
          orderBy: { createdAt: "asc" },
          include: { year: true },
        })
      : await prisma.rFOStage.findMany({
          where,
          orderBy: { createdAt: "asc" },
          select: { id: true, yearId: true, stage: true },
        })

    return NextResponse.json(stages)
  } catch (error) {
    console.error("Error fetching RFO stages:", error)
    return NextResponse.json({ error: "Failed to fetch RFO stages" }, { status: 500 })
  }
}

// POST /api/rfo-stages - create a new RFO stage
export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession()
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "İcazə yoxdur." }, { status: 403 })
    }

    const body = await request.json()
    const { yearId, stage, description, isActive } = body

    // Validate required fields
    if (typeof yearId !== "string" || !yearId.trim() || typeof stage !== "string" || !stage.trim()) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const rfoStage = await prisma.rFOStage.create({
      data: {
        yearId: yearId.trim(),
        stage: stage.trim(),
        description: typeof description === "string" && description.trim() ? description.trim() : null,
        isActive: typeof isActive === "boolean" ? isActive : true,
      },
    })

    return NextResponse.json(rfoStage, { status: 201 })
  } catch (error) {
    console.error("Error creating RFO stage:", error)
    return NextResponse.json({ error: "Failed to create RFO stage" }, { status: 500 })
  }
}
import { NextRequest, NextResponse } from "next/server"
import type { Prisma } from "@prisma/client"
import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { parseRfoFiles } from "@/lib/rfo-files"

// GET /api/rfo-years - list RFO years
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || undefined
    const session = await getAuthSession()
    const isAdmin = session?.user?.role === "admin"
    const where: Prisma.RFOYearWhereInput = isAdmin ? {} : { isActive: true }
    if (search) {
      const parsedYear = Number.parseInt(search, 10)
      where.OR = Number.isInteger(parsedYear)
        ? [{ year: parsedYear }, { label: { contains: search } }]
        : [{ label: { contains: search } }]
    }

    const years = isAdmin
      ? await prisma.rFOYear.findMany({
          where,
          orderBy: { year: "desc" },
          include: { stages: true },
        })
      : await prisma.rFOYear.findMany({
          where,
          orderBy: { year: "desc" },
          select: {
            id: true,
            year: true,
            label: true,
            stages: {
              where: { isActive: true },
              select: { id: true, yearId: true, stage: true },
            },
          },
        })

    return NextResponse.json(years)
  } catch (error) {
    console.error("Error fetching RFO years:", error)
    return NextResponse.json({ error: "Failed to fetch RFO years" }, { status: 500 })
  }
}

// POST /api/rfo-years - create a new RFO year
export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession()
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "İcazə yoxdur." }, { status: 403 })
    }

    const body = await request.json()
    const { year: rawYear, label, isActive, files: rawFiles } = body
    const year = Number.parseInt(String(rawYear), 10)
    const files = parseRfoFiles(rawFiles)

    if (!Number.isInteger(year) || year < 1 || files === null) {
      return NextResponse.json(
        { error: "İl və faylların JSON məlumatı düzgün göstərilməlidir." },
        { status: 400 }
      )
    }

    // Check if year already exists
    const existingYear = await prisma.rFOYear.findUnique({
      where: { year },
    })

    if (existingYear) {
      return NextResponse.json(
        { error: "Year already exists" },
        { status: 400 }
      )
    }

    const rfoYear = await prisma.rFOYear.create({
      data: {
        year,
        label: typeof label === "string" && label.trim() ? label.trim() : String(year),
        isActive: typeof isActive === "boolean" ? isActive : true,
        files: files ?? "[]",
      },
    })

    return NextResponse.json(rfoYear, { status: 201 })
  } catch (error) {
    console.error("Error creating RFO year:", error)
    return NextResponse.json({ error: "Failed to create RFO year" }, { status: 500 })
  }
}
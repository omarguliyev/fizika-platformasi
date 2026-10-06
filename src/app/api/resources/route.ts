import { NextRequest, NextResponse } from "next/server"
import type { Prisma } from "@prisma/client"
import prisma from "@/lib/prisma"
import { getAuthSession } from "@/lib/auth"

// GET /api/resources - list resources with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || undefined
    const level = searchParams.get("level") || undefined
    const resourceType = searchParams.get("resourceType") || undefined
    const year = searchParams.get("year") || undefined
    const stage = searchParams.get("stage") || undefined
    const search = searchParams.get("search") || undefined

    const session = await getAuthSession()
    const isAdmin = session?.user?.role === "admin"
    const where: Prisma.ResourceWhereInput = isAdmin ? {} : { isActive: true }
    if (category) where.category = category
    if (level === "JUNIOR" || level === "SENIOR") {
      where.level = { in: [level, "BOTH"] }
    } else if (level) {
      where.level = level
    }
    if (resourceType) where.resourceType = resourceType
    if (year) {
      const parsedYear = Number.parseInt(year, 10)
      if (!Number.isInteger(parsedYear)) {
        return NextResponse.json({ error: "İl düzgün göstərilməyib." }, { status: 400 })
      }
      where.year = parsedYear
    }
    if (stage) where.stage = stage
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { tags: { contains: search } },
      ]
    }

    const resources = await prisma.resource.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })

    const resourcesWithTagsAsArray = resources.map((resource) => {
      const tags = resource.tags
        ? resource.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
        : []

      if (isAdmin) return { ...resource, tags }

      return {
        id: resource.id,
        title: resource.title,
        description: resource.description,
        category: resource.category,
        topic: resource.topic,
        level: resource.level,
        resourceType: resource.resourceType,
        year: resource.year,
        stage: resource.stage,
        tags,
      }
    })

    return NextResponse.json(resourcesWithTagsAsArray)
  } catch (error) {
    console.error("Error fetching resources:", error)
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 })
  }
}

// POST /api/resources - create a new resource
export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession()
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "İcazə yoxdur." }, { status: 403 })
    }

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

    // Validate required fields
    if (
      typeof title !== "string" || !title.trim() ||
      typeof category !== "string" || !category ||
      typeof level !== "string" || !level ||
      typeof resourceType !== "string" || !resourceType ||
      (resourceType !== "TEST" && (typeof fileUrl !== "string" || !fileUrl.trim()))
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const parsedYear = year ? Number.parseInt(String(year), 10) : null
    if (year && !Number.isInteger(parsedYear)) {
      return NextResponse.json({ error: "İl tam ədəd olmalıdır." }, { status: 400 })
    }

    // Prepare tags as comma-separated string for storage
    const tagsString = Array.isArray(tags) ? tags.join(",") : typeof tags === "string" ? tags : ""

    const resource = await prisma.resource.create({
      data: {
        title: title.trim(),
        description: description || null,
        fileUrl: fileUrl || null,
        thumbnailUrl: thumbnailUrl || null,
        category,
        topic: topic || null,
        level,
        resourceType,
        year: parsedYear,
        stage: stage || null,
        tags: tagsString,
        isActive: true,
        uploadedById: session.user.id,
      },
    })

    return NextResponse.json(resource, { status: 201 })
  } catch (error) {
    console.error("Error creating resource:", error)
    return NextResponse.json({ error: "Failed to create resource" }, { status: 500 })
  }
}
import { readFile } from "fs/promises"
import path from "path"
import { NextRequest, NextResponse } from "next/server"
import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAuthSession()
  if (session?.user?.role !== "user" && session?.user?.role !== "admin") {
    const loginUrl = new URL("/login", _request.url)
    loginUrl.searchParams.set("callbackUrl", `/api/resources/${(await params).id}/download`)
    return NextResponse.redirect(loginUrl)
  }

  const { id } = await params
  const resource = await prisma.resource.findFirst({
    where: { id, isActive: true },
    select: { fileUrl: true, title: true },
  })
  if (!resource?.fileUrl) {
    return NextResponse.json({ error: "Resurs faylı tapılmadı." }, { status: 404 })
  }

  if (!resource.fileUrl.startsWith("/uploads/")) {
    return NextResponse.redirect(new URL(resource.fileUrl, _request.url))
  }

  const filename = path.basename(resource.fileUrl)
  const filePath = path.join(process.cwd(), "uploads", filename)
  try {
    const content = await readFile(filePath)
    return new NextResponse(content, {
      headers: {
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Type": "application/octet-stream",
        "Cache-Control": "private, no-store",
      },
    })
  } catch (error) {
    console.error("Resource download failed:", error)
    return NextResponse.json({ error: "Resurs faylı oxuna bilmədi." }, { status: 404 })
  }
}

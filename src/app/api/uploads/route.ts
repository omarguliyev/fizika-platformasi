import { randomUUID } from "crypto"
import { mkdir, writeFile } from "fs/promises"
import path from "path"
import { NextRequest, NextResponse } from "next/server"
import { getAuthSession } from "@/lib/auth"

const allowedTypes = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "text/plain",
  "video/mp4",
])
const extensionByType: Record<string, string> = {
  "application/pdf": ".pdf",
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "text/plain": ".txt",
  "video/mp4": ".mp4",
}

export async function POST(request: NextRequest) {
  const session = await getAuthSession()
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "İcazə yoxdur." }, { status: 403 })
  }

  const formData = await request.formData()
  const file = formData.get("file")
  if (!(file instanceof File) || !allowedTypes.has(file.type)) {
    return NextResponse.json({ error: "Yalnız PDF, JPG, PNG, TXT və MP4 fayllarına icazə verilir." }, { status: 400 })
  }
  const maxBytes = Number(process.env.MAX_FILE_SIZE || 10 * 1024 * 1024)
  if (file.size > maxBytes) {
    return NextResponse.json({ error: "Fayl ölçüsü icazə verilən həddi aşır." }, { status: 413 })
  }

  const uploadDirectory = path.join(process.cwd(), "uploads")
  await mkdir(uploadDirectory, { recursive: true })
  const filename = `${randomUUID()}${extensionByType[file.type]}`
  await writeFile(path.join(uploadDirectory, filename), Buffer.from(await file.arrayBuffer()))
  return NextResponse.json({ url: `/uploads/${filename}`, name: file.name, type: file.type }, { status: 201 })
}

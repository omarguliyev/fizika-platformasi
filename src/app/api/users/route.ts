import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const username = typeof body.username === "string" ? body.username.trim() : ""
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
    const password = typeof body.password === "string" ? body.password : ""

    if (!/^[\p{L}\p{N}_-]{3,32}$/u.test(username)) {
      return NextResponse.json({ error: "İstifadəçi adı 3-32 simvol olmalıdır." }, { status: 400 })
    }
    if (!email || !email.includes("@") || password.length < 8) {
      return NextResponse.json({ error: "E-poçt düzgün olmalı və şifrə ən azı 8 simvoldan ibarət olmalıdır." }, { status: 400 })
    }

    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
      select: { email: true, username: true },
    })
    if (existing?.email === email) {
      return NextResponse.json({ error: "Bu e-poçt artıq qeydiyyatdan keçib." }, { status: 409 })
    }
    if (existing?.username === username) {
      return NextResponse.json({ error: "Bu istifadəçi adı artıq istifadə olunur." }, { status: 409 })
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: await bcrypt.hash(password, 12),
      },
      select: { id: true, username: true, email: true, createdAt: true },
    })
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error("User registration failed:", error)
    return NextResponse.json({ error: "Qeydiyyat zamanı xəta baş verdi." }, { status: 500 })
  }
}

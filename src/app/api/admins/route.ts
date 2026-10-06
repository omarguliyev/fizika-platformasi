import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { getAuthSession } from "@/lib/auth"

// Helper to check if user is admin
async function adminAuth(request: NextRequest) {
  const session = await getAuthSession()
  if (!session?.user || session.user.role !== "admin") {
    return false
  }
  return true
}

// GET /api/admins - list admins (excluding passwords)
export async function GET(request: NextRequest) {
  try {
    const isAuthorized = await adminAuth(request)
    if (!isAuthorized) {
      return NextResponse.json({ error: "İcazə yoxdur." }, { status: 403 })
    }

    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(admins)
  } catch (error) {
    console.error("Error fetching admins:", error)
    return NextResponse.json({ error: "Failed to fetch admins" }, { status: 500 })
  }
}

// POST /api/admins - create a new admin
export async function POST(request: NextRequest) {
  try {
    const isAuthorized = await adminAuth(request)
    if (!isAuthorized) {
      return NextResponse.json({ error: "İcazə yoxdur." }, { status: 403 })
    }

    const body = await request.json()
    const { email, name, password } = body

    // Validate required fields
    if (!email || !name || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    })

    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin with this email already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const admin = await prisma.admin.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(admin, { status: 201 })
  } catch (error) {
    console.error("Error creating admin:", error)
    return NextResponse.json({ error: "Failed to create admin" }, { status: 500 })
  }
}

// PUT /api/admins/:id - update an admin
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<Record<string, string>> }
) {
  try {
    const isAuthorized = await adminAuth(request)
    if (!isAuthorized) {
      return NextResponse.json({ error: "İcazə yoxdur." }, { status: 403 })
    }

    const id = (await params).id
    const body = await request.json()
    const { email, name, password } = body

    // Check if admin exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { id },
    })

    if (!existingAdmin) {
      return NextResponse.json(
        { error: "Admin not found" },
        { status: 404 }
      )
    }

    // Check if email is already taken by another admin
    if (email && email !== existingAdmin.email) {
      const emailTaken = await prisma.admin.findUnique({
        where: { email },
      })

      if (emailTaken) {
        return NextResponse.json(
          { error: "Email is already taken by another admin" },
          { status: 400 }
        )
      }
    }

    // Prepare update data
    const updateData: any = {
      email: email || undefined,
      name: name || undefined,
    }

    // Hash password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    const admin = await prisma.admin.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(admin)
  } catch (error) {
    console.error("Error updating admin:", error)
    return NextResponse.json({ error: "Failed to update admin" }, { status: 500 })
  }
}

// DELETE /api/admins/:id - delete an admin
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<Record<string, string>> }
) {
  try {
    const isAuthorized = await adminAuth(request)
    if (!isAuthorized) {
      return NextResponse.json({ error: "İcazə yoxdur." }, { status: 403 })
    }

    const id = (await params).id

    // Check if admin exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { id },
    })

    if (!existingAdmin) {
      return NextResponse.json(
        { error: "Admin not found" },
        { status: 404 }
      )
    }

    // Prevent deleting the last admin
    const adminCount = await prisma.admin.count()
    if (adminCount <= 1) {
      return NextResponse.json(
        { error: "Cannot delete the last admin" },
        { status: 400 }
      )
    }

    await prisma.admin.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting admin:", error)
    return NextResponse.json({ error: "Failed to delete admin" }, { status: 500 })
  }
}
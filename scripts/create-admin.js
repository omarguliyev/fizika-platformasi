async function main() {
  const nextEnv = await import("@next/env")
  const loadEnvConfig = nextEnv.loadEnvConfig ?? nextEnv.default?.loadEnvConfig
  if (typeof loadEnvConfig !== "function") {
    throw new Error("Next.js environment loader is unavailable")
  }
  loadEnvConfig(process.cwd())

  const { PrismaClient } = await import("@prisma/client")
  const bcrypt = (await import("bcryptjs")).default
  const prisma = new PrismaClient()

  try {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
    const password = process.env.ADMIN_PASSWORD
    const previousEmail = process.env.ADMIN_PREVIOUS_EMAIL?.trim().toLowerCase()

    if (!email || !password) {
      throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env")
    }
    if (password.length < 8) {
      throw new Error("ADMIN_PASSWORD must be at least 8 characters long")
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const existingAdmin = await prisma.admin.findUnique({ where: { email } })

    if (existingAdmin) {
      await prisma.admin.update({
        where: { id: existingAdmin.id },
        data: { password: hashedPassword },
      })
    } else if (previousEmail) {
      const previousAdmin = await prisma.admin.findUnique({ where: { email: previousEmail } })
      if (!previousAdmin) {
        throw new Error("ADMIN_PREVIOUS_EMAIL does not match an existing admin account")
      }

      await prisma.admin.update({
        where: { id: previousAdmin.id },
        data: { email, password: hashedPassword },
      })
    } else {
      await prisma.admin.create({
        data: { email, name: "Admin User", password: hashedPassword },
      })
    }

    console.log("Admin account synchronized from .env.")
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((error) => {
    console.error("Admin account synchronization failed:", error instanceof Error ? error.message : "Unknown error")
    process.exitCode = 1
  })
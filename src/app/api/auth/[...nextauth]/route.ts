import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import { PrismaClient } from "@prisma/client"
import CredentialsProvider from "next-auth/providers/credentials"
import * as bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "admin-credentials",
      name: "Admin credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Validate input
        if (!credentials?.email || !credentials?.password) {
          console.warn("Auth attempt with missing email or password")
          return null
        }

        // Ensure email and password are strings
        if (typeof credentials.email !== 'string' || typeof credentials.password !== 'string') {
          console.warn("Auth attempt with non-string email or password")
          return null
        }

        try {
            const user = await prisma.admin.findUnique({
            where: { email: credentials.email.toLowerCase().trim() },
          })

          if (!user) {
            console.warn(`Auth attempt for non-existent email: ${credentials.email}`)
            return null
          }

          // Compare hashed password
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!passwordMatch) {
            console.warn(`Auth attempt with incorrect password for email: ${credentials.email}`)
            return null
          }

          // Return user object
          return {
            id: user.id,
            email: user.email,
            name: user.name || user.email.split("@")[0],
            role: "admin" as const,
          }
        } catch (error) {
          console.error("Error during authentication:", error)
          return null
        }
      },
    }),
    CredentialsProvider({
      id: "user-credentials",
      name: "User credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          typeof credentials?.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null
        }

        const email = credentials.email.toLowerCase().trim()
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          return null
        }

        await prisma.user.update({
          where: { id: user.id },
          data: { lastActivityAt: new Date() },
        })

        return {
          id: user.id,
          email: user.email,
          name: user.username,
          username: user.username,
          role: "user" as const,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.role = user.role
        token.username = user.username
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.role = token.role || "user"
        session.user.username = token.username
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
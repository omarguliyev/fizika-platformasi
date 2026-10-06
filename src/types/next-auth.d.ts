import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface User {
    id: string
    role: "admin" | "user"
    username?: string
  }

  interface Session {
    user: {
      id: string
      role: "admin" | "user"
      username?: string
      email?: string | null
      name?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    role?: "admin" | "user"
    username?: string
  }
}

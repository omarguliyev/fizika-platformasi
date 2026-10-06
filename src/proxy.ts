import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  if (pathname === "/admin/login") {
    return NextResponse.next()
  }

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const isAdminRoute = pathname.startsWith("/admin")
  const isAuthorized = isAdminRoute
    ? token?.role === "admin"
    : token?.role === "user" || token?.role === "admin"

  if (isAuthorized) {
    return NextResponse.next()
  }

  const loginPath = isAdminRoute ? "/admin/login" : "/login"
  const loginUrl = new URL(loginPath, request.url)
  loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/junior/:path*",
    "/senior/:path*",
    "/resources/:path*",
    "/rfo-papers/:path*",
    "/past-papers/:path*",
    "/ai-assistant/:path*",
    "/tests/:path*",
    "/profile/:path*",
    "/uploads/:path*",
  ],
}
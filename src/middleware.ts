import createMiddleware from "next-intl/middleware"
import { NextRequest } from "next/server"

import { publicPaths } from "@/configs/routes/public"

import { STORE_KEYS } from "./constants"
import { routing } from "./i18n/routing"

// Create a middleware for internationalization
const intlMiddleware = createMiddleware(routing)

// Create a middleware for authentication
export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Public paths that don't require authentication
  const isPublicPath = publicPaths.find((path) => pathname.includes(path))

  // Check if this is a not-found route
  const isNotFoundRoute = pathname === "/404"

  // Get auth state from cookies
  let isAuthenticated = false
  const authCookie = request.cookies.get(STORE_KEYS.auth)

  if (authCookie?.value) {
    try {
      const authState = JSON.parse(decodeURIComponent(authCookie.value))
      isAuthenticated = authState.state?.logged || false
    } catch (error) {
      console.error("Error parsing auth cookie:", error)
    }
  }

  // Always allow access to not-found pages
  if (isNotFoundRoute) {
    return intlMiddleware(request)
  }

  // Handle authentication redirects
  if (!isPublicPath && !isAuthenticated) {
    // User is not authenticated and trying to access protected route
    // Redirect to login page with the original URL as the callback
    const url = new URL(`/${routing.defaultLocale}/login`, request.url)
    url.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return Response.redirect(url)
  }

  if (isAuthenticated && pathname.includes("/login")) {
    // User is authenticated but trying to access login page
    // Redirect to dashboard
    const url = new URL(`/${routing.defaultLocale}/dashboard`, request.url)
    return Response.redirect(url)
  }

  // Apply the internationalization middleware
  return intlMiddleware(request)
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)"
}

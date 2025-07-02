export const systemRoutes = {
  _next: "/_next",
  api: "/api",
  trpc: "/trpc",
  _vercel: "/_vercel",
  ".": "."
} satisfies Record<string, string>

export const publicRoutes = {
  ...systemRoutes,
  login: "/login",
  notFound: "/not-found"
} satisfies Record<string, string>

export const publicPaths = Object.values(publicRoutes)

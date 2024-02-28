import { auth } from './auth'

const authRoutes = ['/auth/login', '/auth/register', '/auth/error']
const apiAuthPrefix = "/api/auth";

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }
})

// Optionally, don't invoke Middleware on some paths
// Use matcher from clerk. It is better than default matcher
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}

import { auth } from './auth'

export default auth((req) => {
  req.auth
})

// Optionally, don't invoke Middleware on some paths
// Use matcher from clerk. It is better than default matcher

export const config = {
  matcher: '/((?!api|_next|static|public|favicon.ico).*)',
}

import { authMiddleware } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export default authMiddleware({
  beforeAuth: async (req) => {
    let authCookieServer = req.cookies.get('auth')
    let authPayload = null
    const secret = process.env.JWT_SECRET
    if (authCookieServer) {
      try {
        const { payload } = await jwtVerify(
          authCookieServer?.value,
          new TextEncoder().encode(secret),
        )
        authPayload = payload
        const currentTime = Date.now()
        const currentTimeInSeconds = Math.floor(currentTime / 1000)
        if (authPayload.exp && currentTimeInSeconds >= authPayload?.exp) {
          console.log('El token ha caducado.')
          authPayload = null
          authCookieServer = undefined
          let response = NextResponse.next()
          response.cookies.delete('auth')
          return response
        } else {
          console.log('El token está vigente.')
        }
      } catch (error) {
        authCookieServer = undefined
        authPayload = null
        console.log('Error al verificar el token:', error)
        let response = NextResponse.next()
        response.cookies.delete('auth')
        return response
      }
    }
  },

  // Routes that can be accessed while signed out
  publicRoutes: [
    '/',
    '/sign-in',
    '/sign-up',
    '/login',
    '/register',
    '/questions',
    '/consults',
    '/exams(.*)',
    '/subjects(.*)',
    '/progress',
    '/profile',
    '/api/get-profile',
    '/api/get-questions',
    '/api/get-questions-statistics',
    


  ],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: [],
})

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}

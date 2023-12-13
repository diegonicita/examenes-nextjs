import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { jwtVerify } from 'jose'

export function middleware(request: NextRequest) {
  const authCookieServer = request.cookies.get('auth')
  // if (authCookieServer && process.env.JWT_SECRET) {
  //   const secretKey = createSecretKey(process.env.JWT_SECRET, 'utf-8')
  //   const decoded = jwtVerify(authCookieServer?.value, secretKey)
  //   console.log(decoded)
  // }
  // if (request.nextUrl.pathname.startsWith('/consults-server') && !cookieServer) {
  //   return NextResponse.redirect(new URL('/not-authorized', request.url))
  // }

  // if (request.nextUrl.pathname.startsWith('/question') && !cookieServer) {
  //   return NextResponse.redirect(new URL('/not-authorized', request.url))
  // }

  if (
    request.nextUrl.pathname.startsWith('/api/authorization') &&
    !authCookieServer
  ) {
    const headersList = headers()
    const authHeader = headersList.get('authorization')
    const response = NextResponse.next()
    if (authHeader) {
      var partes = authHeader.split(' ')
      if (partes.length >= 2) {
        var token = partes[1]
        response.cookies.set('auth', token)
      }
    }
    return response
  }
}

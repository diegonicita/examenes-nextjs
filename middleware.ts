import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { headers } from 'next/headers'

export function middleware(request: NextRequest) {
  const cookieServer = request.cookies.get('auth')

  // if (request.nextUrl.pathname.startsWith('/consults-server') && !cookieServer) {
  //   return NextResponse.redirect(new URL('/not-authorized', request.url))
  // }

  // if (request.nextUrl.pathname.startsWith('/question') && !cookieServer) {
  //   return NextResponse.redirect(new URL('/not-authorized', request.url))
  // }

  if (
    request.nextUrl.pathname.startsWith('/api/authorization') &&
    !cookieServer
  ) {
    const headersList = headers()
    const cookie = headersList.get('authorization')
    const response = NextResponse.next()
    if (cookie) {
      var partes = cookie.split(' ')
      if (partes.length >= 2) {
        var segundaParte = partes[1]
        response.cookies.set('auth', segundaParte)
      }
    }
    return response
  }
}

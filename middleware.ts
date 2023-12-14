import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const authCookieServer = request.cookies.get('auth')
  let authPayload = null

  if (authCookieServer) {
    try {
      const { payload } = await jwtVerify(
        authCookieServer?.value,
        new TextEncoder().encode(process.env.JWT_SECRET),
      )
      authPayload = payload
    } catch (error) {
      console.log(error)
    }
  }

  if (request.nextUrl.pathname.includes('/consults-server')) {
    let response = NextResponse.next()
    response.cookies.set('cs', authPayload ? 'true' : 'false')
    return response
  }

  if (request.nextUrl.pathname.includes('/question')) {
    let response = NextResponse.next()
    response.cookies.set('q', authPayload ? 'true' : 'false')
    return response
  }

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

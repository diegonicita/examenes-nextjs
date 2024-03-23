import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
  let authCookieCredentials = request.cookies.get('auth')
  const authTokenGoogle = request.cookies.get('token')
  let authPayload = null
  const secret = process.env.JWT_SECRET

  if (authTokenGoogle) {
    try {
      const { payload } = await jwtVerify(
        authTokenGoogle?.value,
        new TextEncoder().encode(secret),
      )
      const currentTime = Date.now()
      const currentTimeInSeconds = Math.floor(currentTime / 1000)
      console.log(
        'Google Minutes Left: ',
        Number(payload.exp) / 60 - currentTimeInSeconds / 60,
      )
    } catch (error) {
      console.log('Error al verificar el token:', error)
    }
  }

  if (authCookieCredentials) {
    try {
      const { payload } = await jwtVerify(
        authCookieCredentials?.value,
        new TextEncoder().encode(secret),
      )
      authPayload = payload
      const currentTime = Date.now()
      const currentTimeInSeconds = Math.floor(currentTime / 1000)
      // console.log(currentTimeInSeconds)
      // console.log(authPayload.exp)
      console.log(
        'AuthCredentials Minutes Left: ',
        Number(payload.exp) / 60 - currentTimeInSeconds / 60,
      )
      if (authPayload.exp && currentTimeInSeconds >= authPayload?.exp) {
        console.log('El token ha caducado.')
        authPayload = null
        authCookieCredentials = undefined
        const response = NextResponse.next()
        response.cookies.delete('auth')
        return response
      }
      console.log('El token está vigente.')
      const response = NextResponse.next()
      response.cookies.delete('token')
      return response
    } catch (error) {
      authCookieCredentials = undefined
      authPayload = null
      console.log('Error al verificar el token:', error)
      const response = NextResponse.next()
      response.cookies.delete('auth')
      return response
    }
  }
}

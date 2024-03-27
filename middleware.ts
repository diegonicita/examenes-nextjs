import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
  const authCookieCredentials = request.cookies.get('auth')
  const authTokenGoogle = request.cookies.get('token')
  let authPayload = null
  const secret = process.env.JWT_SECRET
  const LOGIN = `${process.env.URL_API}/login?redirect=${
    request.nextUrl.pathname + request.nextUrl.search
  }`

  if (authTokenGoogle) {
    try {
      const { payload } = await jwtVerify(
        authTokenGoogle?.value,
        new TextEncoder().encode(secret),
      )
      authPayload = payload
      // console.log(
      //   'Google Token Minutes Left: ',
      //   getTimeLeftInMinutes(Number(payload.exp)),
      // )
      // console.log('El token de Google está vigente.')
    } catch (error) {
      authPayload = null
      // console.log('Error al verificar el token de Google:', error)
      return deleteCookie('token', LOGIN)
    }
  }

  if (authCookieCredentials) {
    try {
      const { payload } = await jwtVerify(
        authCookieCredentials?.value,
        new TextEncoder().encode(secret),
      )
      authPayload = payload
      // console.log(
      //   'Credentials (auth) Minutes Left: ',
      //   getTimeLeftInMinutes(Number(payload.exp)),
      // )
      // console.log('auth está vigente')
    } catch (error) {
      // console.log('Error en cookie auth:', error)
      authPayload = null
      return deleteCookie('auth', LOGIN)
    }
  }
}

const deleteCookie = (name: string, loginURL: string) => {
  const response = NextResponse.next()
  response.cookies.delete(name)
  return response
}
const getTimeInSeconds = () => Math.floor(Date.now() / 1000)
const getTimeLeftInMinutes = (exp: number) => exp / 60 - getTimeInSeconds() / 60
const tokenExpired = (exp: number) => getTimeInSeconds() >= exp

import type { UserType } from '@/app/models/User'
import { SignJWT, jwtVerify } from 'jose'
// import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import getUserIdOrCreateUser from './getUserIdOrCreateUser'
import getUserIdAndRole from './getUserIdAndRole'

const secretKey = process.env.JWT_SECRET
const key = new TextEncoder().encode(secretKey)

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10 sec from now')
    .sign(key)
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  })
  return payload as UserType
}

const getInfoAuthCookie = async () => {
  const auth = cookies().get('auth')
  const token = cookies().get('token')

  if (auth?.value && secretKey) {
    try {
      const payload = await decrypt(auth.value)
      const respuesta = await getUserIdAndRole(payload.email)
      if (respuesta?.id) {
        payload.role = respuesta.role
      }
      return payload as UserType
    } catch (error) {
      console.log(error)
      return null
    }
  }

  if (token?.value && secretKey) {
    try {
      const payload = (await decrypt(token.value)) as {
        clientId: number
        clientEmail: string
        displayName: string
        iat: string
        exp: string
      }
      const pl = {
        id: payload.clientId,
        email: payload.clientEmail,
        username: payload.displayName,
        role: 'user-1' as string,
        verify: 1 as number,
        iat: payload.iat,
        exp: payload.exp,
      }
      // Check if userId exists. If not create a new user.
      const respuesta = await getUserIdOrCreateUser(pl.email)
      if (respuesta?.id) {
        return {
          ...pl,
          id: respuesta.id,
          role: respuesta.role,
        }
      }
      return null
    } catch (error) {
      console.log(error)
      return null
    }
  }
  return null
}

export default getInfoAuthCookie

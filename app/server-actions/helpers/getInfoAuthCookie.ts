import type { UserType } from '@/app/models/User'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import getUserIdOrCreateUser from './getUserIdOrCreateUser'
import getUserIdAndRole from './getUserIdAndRole'

const getInfoAuthCookie = async () => {
  const auth = cookies().get('auth')
  const token = cookies().get('token')
  const secret = process.env.JWT_SECRET

  if (auth?.value && secret) {
    try {
      const payload = jwt.verify(auth.value, secret) as
        | UserType
        | jwt.JwtPayload
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

  if (token?.value && secret) {
    try {
      const payload = jwt.verify(token.value, secret) as
        | {
            clientId: number
            clientEmail: string
            displayName: string
            iat: string
            exp: string
          }
        | jwt.JwtPayload
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

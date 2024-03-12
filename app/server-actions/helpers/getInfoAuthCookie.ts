import { UserType } from '@/app/models/User'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { getUserId } from './getUserId'

const getInfoAuthCookie = async () => {
  const auth = cookies().get('auth')
  const token = cookies().get('token')
  const secret = process.env.JWT_SECRET

  if (auth && auth?.value && secret) {
    try {
      const payload = jwt.verify(auth.value, secret) as any
      return payload as UserType
    } catch (error) {
      console.log(error)
      return null
    }
  }

  if (token && token?.value && secret) {
    try {
      const payload = jwt.verify(token.value, secret) as any
      const pl = {
        id: payload.clientId as number,
        email: payload.clientEmail as string,
        username: payload.displayName as string,
        role: 'client' as string,
        verify: 1 as number,
        iat: payload.iat,
        exp: payload.exp,
      }
      // Check if userId exists. If not create a new user.
      const respuesta = await getUserId(pl.email)
      if (respuesta && respuesta.id) {
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

import { clerkClient } from '@clerk/nextjs'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { getUserId } from './getUserId'

const getInfoAuthCookie = async () => {
  const publicKey = process.env.CLERK_PEM_PUBLIC_KEY
  const sessToken: RequestCookie | undefined = cookies().get('__session')
  try {
    let decoded: string | jwt.JwtPayload = ''
    if (sessToken && publicKey) {
      decoded = jwt.verify(sessToken.value, publicKey)
      console.log(decoded, 'decoded')
      if (decoded && decoded.sub) {
        const user = await clerkClient.users.getUser(decoded?.sub?.toString())
        console.log(user, 'user')
        const username = user.firstName + ' ' + user.lastName
        const respuesta = await getUserId(user.emailAddresses[0].emailAddress)
        console.log(respuesta, 'id')
        if (respuesta && respuesta.id) {
          console.log(respuesta, 'id')
          return {
            id: respuesta && respuesta.id ? respuesta.id : undefined,
            email: user.emailAddresses[0].emailAddress,
            role: 'admin',
            username: username,
            clerkId: user.id,
            clerkImage: user.imageUrl,
          }
        } else {
          return null
        }
      }
    } else {
      return null
    }
  } catch (error) {
    console.log(error, 'error')
    return null
  }

  // const auth = cookies().get('auth')
  // const secret = process.env.JWT_SECRET
  // if (auth) {
  //   const { payload } = await jwtVerify(
  //     auth.value,
  //     new TextEncoder().encode(secret),
  //   )
  //   return payload
  // }
  // return null
}

export default getInfoAuthCookie

import { clerkClient } from '@clerk/nextjs'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

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
        return {
          id: 8,
          email: user.emailAddresses[0].emailAddress,
          role: 'admin',
          username: username,
          clerkId: user.id,
          clerkImage: user.imageUrl
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

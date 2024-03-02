import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const getInfoAuthCookie = async () => {
  const auth = cookies().get('auth')
  const secret = process.env.JWT_SECRET
  if (auth) {
    try {
      const { payload } = await jwtVerify(
        auth.value,
        new TextEncoder().encode(secret),
      )
      return payload
    } catch (error) {
      console.log(error)
      return null
    }
  }
  return null
}

export default getInfoAuthCookie

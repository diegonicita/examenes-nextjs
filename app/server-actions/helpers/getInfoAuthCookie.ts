import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const getInfoAuthCookie = async () => {
  const auth = cookies().get('auth')
  const secret = process.env.JWT_SECRET
  if (auth) {
    const { payload } = await jwtVerify(
      auth.value,
      new TextEncoder().encode(secret),
    )
    return payload
  }
  return null
}

export default getInfoAuthCookie

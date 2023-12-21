import { jwtVerify } from 'jose'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'

type Auth = RequestCookie | undefined

const getData = async (auth: Auth) => {
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

export default getData

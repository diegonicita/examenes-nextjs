import { jwtVerify } from 'jose'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

type Auth = RequestCookie | undefined

const getRole = async (auth: Auth) => {
  const secret = process.env.JWT_SECRET
  if (auth) {
    const { payload } = await jwtVerify(
      auth.value,
      new TextEncoder().encode(secret),
    )
    return payload.role
  }
  return null
}

export default getRole

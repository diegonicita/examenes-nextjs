import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import getGitHubAuth from './getGitHubAuth'

const getInfoAuthCookie = async () => {
  const auth = cookies().get('auth')
  const secret = process.env.JWT_SECRET
  const github = await getGitHubAuth()
  if (github) return github
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

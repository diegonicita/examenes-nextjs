import getNextAuthUser from './getNextAuthUser'

const getInfoAuthCookie = async () => {
  const nextAuthUser = await getNextAuthUser()
  if (nextAuthUser) return nextAuthUser
  return null
}

export default getInfoAuthCookie

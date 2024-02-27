import { createUser } from './createUser'
import { getUserId } from './getUserId'
import { auth } from '@/auth'

const getGitHubAuth = async () => {
  const session = await auth()
  if (!session) {
    return null
  }
  const user = session?.user
  const name = user?.name
  const email = user?.email
  const image = user?.image

  try {
    const respuesta = await getUserId(email)
    if (respuesta && respuesta.id) {
      return {
        id: respuesta.id,
        email: email,
        role: respuesta.role,
        username: name,
        image: image,
      }
    }
    if (email) {
      const createResponse: { message: string; id: number } = await createUser(
        email,
      )
      if (createResponse.message === 'success') {
        return {
          message: 'success',
          id: createResponse.id,
          role: 'user',
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

export default getGitHubAuth

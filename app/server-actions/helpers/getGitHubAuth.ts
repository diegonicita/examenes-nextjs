import { getUserId } from './getUserId'
import { auth } from '@/app/auth'

const getGitHubAuth = async () => {
  const session = await auth()
  if (!session) {
    return null
  }

  try {
    const user = session?.user
    const name = user?.name
    const email = user?.email
    const image = user?.image
    const respuesta = await getUserId(email)
    if (respuesta && respuesta.id) {
      console.log('hay usuario')
      return {
        id: respuesta.id,
        email: email,
        role: respuesta.role,
        username: name,
        image: image,
      }
    }
  } catch (error) {
    console.log(error)
  }
  console.log('no hay usuario')
  return null
}

export default getGitHubAuth

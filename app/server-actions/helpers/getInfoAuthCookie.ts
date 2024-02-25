import { clerkClient } from '@clerk/nextjs'
import { getUserId } from './getUserId'

const getInfoAuthCookie = async (userId: string | null) => {
  
  if (!userId) {
    return null
  }
  
  const user = await clerkClient.users.getUser(userId)
  const name = user.firstName
  const lastname = user.lastName
  const fullname =
    name !== null && lastname !== null
      ? `${name} ${lastname}`
      : name !== null
      ? name
      : lastname !== null
      ? lastname
      : user.emailAddresses[0].emailAddress
  // Check if userId exists. If not create a new user.
  const respuesta = await getUserId(user.emailAddresses[0].emailAddress)
  if (respuesta && respuesta.id) {
    console.log('hay usuario')
    return {
      id: respuesta.id,
      email: user.emailAddresses[0].emailAddress,
      role: respuesta.role,
      username: fullname,
      clerkId: user.id,
      clerkImage: user.imageUrl,
    }
  }
  console.log('no hay usuario')
  return null
}

export default getInfoAuthCookie

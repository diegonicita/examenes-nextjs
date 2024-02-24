import { auth, clerkClient } from '@clerk/nextjs'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { getUserId } from './getUserId'

const getInfoAuthCookie = async () => {
  const { userId } = auth()

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
  console.log(user.emailAddresses[0].emailAddress, 'email user')
  const respuesta = await getUserId(user.emailAddresses[0].emailAddress)
  if (respuesta && respuesta.id) {
    return {
      id: respuesta.id,
      email: user.emailAddresses[0].emailAddress,
      role: respuesta.role,
      username: fullname,
      clerkId: user.id,
      clerkImage: user.imageUrl,
    }
  }  
  return null
}

export default getInfoAuthCookie

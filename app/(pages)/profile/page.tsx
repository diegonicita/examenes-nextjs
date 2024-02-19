import React from 'react'
import type { UserType } from '@/app/models/User'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import MessageNotLogged from '@/app/components/messages/messageNotLogged'
import { OrganizationSwitcher } from '@clerk/nextjs'

const Profile = async () => {
  try {
    const authData = (await getInfoAuthCookie()) as UserType

    if (authData) {
      return (
        <div className="flex flex-col items-center mt-4 justify-center text-sm">
          <div className="bg-base-200 p-2 rounded">
            <div className="flex justify-center">
              {authData && authData.clerkImage && (
                <img src={authData.clerkImage} width={200} />
              )}
            </div>
            <div className="text-xl pb-4 font-bold text-center">
              Perfil del Usuario
            </div>
            <OrganizationSwitcher />
            <div>ID: {authData && authData.id?.toString()}</div>
            <div>Clerk Id: {authData && authData.clerkId} </div>
            <div>Nombre: {authData && authData.username}</div>
            <div>Email: {authData && authData.email}</div>
            <div>Rol: {authData && authData.role} </div>
          </div>
          {/* <Counter />
          <Message /> */}
        </div>
      )
    } else {
      return <MessageNotLogged />
    }
  } catch (error) {
    console.log('Error al requerir el Profile')
  }
}

export default Profile

export const metadata = {
  title: 'Perfil del Usuario',
}

import React from 'react'
import type { UserType } from '@/app/models/User'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import Counter from './components/counter'
import Message from './components/message'
import MessageNotLogged from '@/app/components/checkCookie/messageNotLogged'
import { auth } from '@/app/auth'

const Profile = async () => {
  try {
    const authData = (await getInfoAuthCookie()) as UserType
    const session = await auth()
    if (authData) {
      return (
        <div className="flex mt-4 gap-4 text-center justify-center">
          <div className="bg-base-200 p-2 gap-4">
            {authData && (
              <img
                src={
                  'https://mercado.webapp.ar/images_avatar/avatar-001-normal.png'
                }
              />
            )}
            <div className="font-bold">CREDENTIALS</div>
            <div>ID: {authData && authData.id?.toString()}</div>
            <div>Nombre: {authData && authData.username}</div>
            <div>Email: {authData && authData.email}</div>
            <div>Rol: {authData && authData.role} </div>
          </div>
          <div className="bg-base-200 p-2">
            {session && session.user && (
              <img className="rounded-full" src={session.user?.image} />
            )}
            <div className="font-bold"> GITHUB: </div>
            <div>Nombre: {session?.user?.name}</div>
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

import React from 'react'
import type { UserType } from '@/app/models/User'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import Counter from './components/counter'
import Message from './components/message'
import MessageNotLogged from '@/app/components/checkCookie/messageNotLogged'

const Profile = async () => {
  try {
    const authData = (await getInfoAuthCookie()) as UserType
    if (authData) {
      return (
        <div className="flex flex-col items-center mt-4 justify-center">
          <div className="bg-base-200 p-2 rounded">
            <img
              src={
                'https://mercado.webapp.ar/images_avatar/avatar-001-normal.png'
              }
            />
            <div className="text-xl pb-4 font-bold text-center">Perfil del Usuario</div>
            <div>ID: {authData && authData.id?.toString()}</div>
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

import React from 'react'
import { cookies } from 'next/headers'
import getData from './getData'
import Counter from './components/counter'
import Message from './components/message'
import MessageNotLogged from '@/app/components/checkCookie/messageNotLogged'

type Response = {
  username: string
  email: string
  role: string
}

const Profile = async () => {
  const auth = cookies().get('auth')
  if (auth) {
    try {
      const data = (await getData(auth)) as Response
      return (
        <div className="flex flex-col items-center mt-4">
          <div>
            <div className="text-xl pb-4 font-bold">Perfil del Usuario</div>
            <div>Usuario: {data && data.username}</div>
            <div>Correo: {data && data.email}</div>
            <div>Rol: {data && data.role} </div>
          </div>
          <Counter />
          <Message />
        </div>
      )
    } catch (error) {
      console.log('Error en Profile')
    }
  }
  return <MessageNotLogged />
}

export default Profile

export const metadata = {
  title: 'Perfil del Usuario',
}

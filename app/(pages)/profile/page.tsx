import React from 'react'
import type { UserType } from '@/app/models/User'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import Counter from './components/counter'
import Message from './components/message'
import MessageNotLogged from '@/app/components/checkCookie/messageNotLogged'
import Link from 'next/link'

const Profile = async () => {
  try {
    const authData = (await getInfoAuthCookie()) as UserType

    if (authData) {
      return (
        <div className="flex flex-col items-center mt-4 justify-center">
          <div className="bg-base-200 p-2 rounded">
            <div className="flex justify-center">
              <img
                src={
                  'https://mercado.webapp.ar/images_avatar/avatar-001-normal.png'
                }
              />
            </div>
            <div className="text-xl pb-4 font-bold text-center">
              Perfil del Usuario
            </div>
            <div>ID: {authData && authData.id?.toString()}</div>
            <div>Nombre de usuario: {authData && authData.username}</div>
            <div>E-mail: {authData && authData.email}</div>
            <div>Rol: {authData && authData.role} </div>
            <div>
              Email Verificado: {authData && authData.verify ? 'Si' : 'No'}{' '}
            </div>
            {authData && authData.verify ? (
              <div className="flex justify-center mt-4 btn btn-disabled">
                Verificar tu Cuenta
              </div>
            ) : (
              <Link
                href="/verify"
                className="flex justify-center mt-4 btn btn-accent"
              >
                Verificar tu Cuenta
              </Link>
            )}
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

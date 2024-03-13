import React from 'react'
import type { UserType } from '@/app/models/User'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import Counter from './components/counter'
import Message from './components/message'
import MessageNotLogged from '@/app/components/checkCookie/messageNotLogged'
import Link from 'next/link'
import Image from 'next/image'
import backgroundImage from '@/app/assets/background-profile.jpg'

const Profile = async () => {
  try {
    const authData = (await getInfoAuthCookie()) as UserType

    if (authData) {
      return (
        <div className="mx-auto max-w-[55rem] mb-8 mt-8">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="font-bold text-3xl">Perfil</h1>
            <span>Estos son tus datos</span>
          </div>
          <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-6 bg-base shadow-xl rounded-lg text-base-content pb-4">
            <div className="rounded-t-lg h-32 overflow-hidden">
              <Image
                className="object-cover object-top w-full opacity-45"
                src={backgroundImage}
                alt="Mountain"
              />
            </div>
            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden opacity-85">
              <img
                className="object-cover object-center h-32"
                src={
                  'https://mercado.webapp.ar/images_avatar/avatar-001-normal.png'
                }
                alt="Imagen de tu Avatar"
              />
            </div>
            <div className="text-center mt-2">
              <h2 className="font-semibold">{authData && authData.username}</h2>
              <p className="text-gray-500">
                nivel: {authData && authData.role}
              </p>
              <p className="text-gray-500">{authData && authData.email}</p>
              <div>
                {authData && authData.verify
                  ? 'Email verificado'
                  : 'Email sin verificar'}{' '}
              </div>
            </div>

            {authData && authData.verify ? (
              <div className="flex justify-center mt-4 btn btn-disabled max-w-40 m-auto">
                Verificar tu Cuenta
              </div>
            ) : (
              <Link
                href="/verify"
                className="flex justify-center mt-4 btn btn-accent max-w-40 m-auto"
              >
                Verificar tu Cuenta
              </Link>
            )}
          </div>

          {/* 




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
          </div> */}
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

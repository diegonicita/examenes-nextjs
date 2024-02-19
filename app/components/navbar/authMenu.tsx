'use client'

import React, { useTransition } from 'react'
import Image from 'next/image'
import userNotLogged from '@/app/assets/icon-not-logged.png'
import userLogged from '@/app/assets/icon-logged.png'
import Link from 'next/link'
//@ts-ignore
import { logoutAction } from '@/app/server-actions/auth/logoutAction'
import { redirect } from 'next/navigation'
import toast from 'react-hot-toast'
import { refreshAction } from '@/app/(pages)/consults/actions/refresh'

// const notifyLogoutSuccess = () => toast.success('Logout Exitoso')
export const notifySuccess = (text: string) =>
  toast.custom(
    (t) => (
      <div
        className={`text-white font-bold bg-success px-6 py-4 shadow  ${
          t.visible ? 'animate-enter' : 'animate-leave'
        }`}
      >
        {text}
      </div>
    ),
    {
      position: 'bottom-left',
    },
  )

export default function AuthMenu({ isLogged }: { isLogged: boolean }) {
  const [isPending, startTransition] = useTransition()

  const handleLogout = async () => {
    const response = await logoutAction()
    refreshAction()
    notifySuccess('Logout Exitoso. Hasta la próxima.')
    await new Promise((res) => setTimeout(res, 500))
    if (response?.message === 'success') {
      setTimeout(
        () =>
          startTransition(() => {
            redirect('/')
          }),
        500,
      )
    }
  }

  return (
    <div>
      <div className="w-auto lg:w-full text-end dropdown dropdown-end">
        {!isLogged && (
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-8 rounded-full">
              <Image alt="Icono del usuario" src={userNotLogged} />
            </div>
          </label>
        )}
        {isLogged && (
          <label tabIndex={0} className="btn mx-2">
            Perfil
          </label>
        )}
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          {!isLogged && (
            <>
              <li>
                <Link href="/sign-in">Ingresar</Link>
              </li>
              <li>
                <Link href="/sign-up">Registrarte</Link>
              </li>
            </>
          )}
          {isLogged && (
            <>
              <li>
                <Link href="/profile" className="justify-between">
                  Ver tu perfil
                  <span className="badge">New</span>
                </Link>
              </li>
              {/* <li>
                <div>Preferencias</div>
              </li> */}
              {/* <li>
                <div onClick={() => handleLogout()}>Salir (Logout)</div>
              </li> */}
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

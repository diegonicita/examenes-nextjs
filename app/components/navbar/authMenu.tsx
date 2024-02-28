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
import { useSession, signOut } from 'next-auth/react'

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
  const { data: session } = useSession()

  const handleLogout = async () => {
    await signOut()
    notifySuccess('Logout Exitoso. Hasta la próxima.')
    await new Promise((res) => setTimeout(res, 500))
    setTimeout(
      () =>
        startTransition(() => {
          redirect('/')
        }),
      500,
    )
  }

  return (
    <div>
      <div className="w-auto lg:w-full text-end dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-8 rounded-full">
            {session && session?.user && (
              <Image
                width={20}
                height={20}
                alt="Icono del usuario"
                src={session?.user?.image ? session?.user?.image : userLogged}
              />
            )}
            {!session && (
              <Image
                width={20}
                height={20}
                alt="Icono del usuario"
                src={userNotLogged}
              />
            )}
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          {!isLogged && (
            <>
              <li>
                <Link href="/login">Ingresar</Link>
              </li>
              <li>
                <Link href="/register">Registrarte</Link>
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
              <li>
                <div>Preferencias</div>
              </li>
              <li>
                <div onClick={() => handleLogout()}>Salir (Logout)</div>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

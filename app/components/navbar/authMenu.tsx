'use client'

import React, { useTransition } from 'react'
import Image from 'next/image'
import userNotLogged from '@/app/assets/icon-not-logged.png'
import userLogged from '@/app/assets/icon-logged.png'
import Link from 'next/link'
//@ts-ignore
import { useFormState } from 'react-dom'
import { logoutAction } from '@/app/(pages)/(auth)/login/actions/logout'
import { refreshAction } from '@/app/(pages)/consults/actions/refresh'
import { redirect } from 'next/navigation'
import toast from 'react-hot-toast'

const notifyLogoutSuccess = () => toast.success('Logout Exitoso')

const initialState = {
  email: '',
  password: '',
  message: '',
}

export default function AuthMenu({ isLogged }: { isLogged: boolean }) {
  const [state, formActionLogout] = useFormState(logoutAction, initialState)
  const [state2, formActionRefresh] = useFormState(refreshAction, initialState)
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    formActionLogout()
    formActionRefresh()
    notifyLogoutSuccess()
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
            <Image
              alt="Icono del usuario"
              src={isLogged ? userLogged : userNotLogged}
            />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          {!isLogged && (
            <>
              <li>
                <Link href="login">Ingresar</Link>
              </li>
              <li>
                <Link href="register">Registrarte</Link>
              </li>
            </>
          )}
          {isLogged && (
            <>
              <li>
                <Link href="profile" className="justify-between">
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

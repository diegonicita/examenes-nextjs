'use client'

import React from 'react'
import Image from 'next/image'
import userNotLogged from '@/app/assets/icon-not-logged.png'
import userLogged from '@/app/assets/icon-logged.png'
import Link from 'next/link'
import { useLogged } from '@/app/(pages)/(auth)/hooks/useLogged'
//@ts-ignore
import { useFormState } from 'react-dom'
import { logoutAction } from '@/app/(pages)/(auth)/login/actions/logout'
import { refreshAction } from '@/app/(pages)/consults/actions/refresh'

const initialState = {
  email: '',
  password: '',
  message: '',
}

export default function AuthMenu() {
  // const { isLogged, logout } = useLogged(undefined)

  const [state, formAction] = useFormState(logoutAction, initialState)
  const [state2, formAction2] = useFormState(refreshAction, initialState)

  const handleLogout = () => {
    formAction()
    formAction2()
  }

  return (
    <div>
      <div className="w-auto lg:w-full text-end dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-8 rounded-full">
            <Image
              alt="Icono del usuario"
              src={userLogged}
            />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          
            <>
              <li>
                <Link href="login">Ingresar</Link>
              </li>
              <li>
                <Link href="register">Registrarte</Link>
              </li>
            </>
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
        </ul>
      </div>
    </div>
  )
}

'use client'

// import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import userNotLogged from '@/app/assets/icon-not-logged.png'
import userLogged from '@/app/assets/icon-logged.png'
import Link from 'next/link'
import { useLogged } from '@/app/(pages)/(auth)/hooks/useLogged'

export default function AuthMenu() {
  const { isLogged, logout } = useLogged(undefined)
  // const [cookieState, setCookieState] = useState<undefined | string>(undefined)

  // useEffect(() => {
  //   const name = Cookies.get('auth')
  //   setCookieState(name)
  // }, [isLogged])

  return (
    <div>
      <div className="w-auto lg:w-full text-end dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-14 rounded-full">
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
            <li>
              <Link href="login">Ingresar</Link>
              {/* <Link href="http://localhost:8126/auth/google-examenes">
              Ingresar
            </a> */}
              {/* <Link href="https://mercado.webapp.ar/auth/google-examenes">
              Ingresar con Google
            </a> */}
            </li>
          )}
          {!isLogged && (
            <li>
              <Link href="register">Registrarte</Link>
            </li>
          )}
          {isLogged && (
            <li>
              <div className="justify-between">
                Ver tu perfil
                <span className="badge">New</span>
              </div>
            </li>
          )}
          {isLogged && (
            <li>
              <div>Preferencias</div>
            </li>
          )}
          {isLogged && (
            <li>
              <div onClick={() => logout()}>Salir (Logout)</div>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

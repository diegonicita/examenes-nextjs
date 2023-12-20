'use client'

import React from 'react'
import Image from 'next/image'
import userNotLogged from '@/app/assets/icon-not-logged.png'
import userLogged from '@/app/assets/icon-logged.png'
import Link from 'next/link'
import { useLogged } from '@/app/(pages)/(auth)/hooks/useLogged'

export default function AuthMenu({ auth }: { auth: string | undefined }) {
  const { isLogged, logout } = useLogged(undefined)

  return (
    <div>
      <div className="w-auto lg:w-full text-end dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-8 rounded-full">
            <Image
              alt="Icono del usuario"
              src={auth ? userLogged : userNotLogged}
            />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          {!auth && (
            <>
              <li>
                <Link href="login">Ingresar</Link>                
              </li>
              <li>
                <Link href="register">Registrarte</Link>
              </li>
            </>
          )}
          {auth && (
            <>
              <li>
                <div className="justify-between">
                  Ver tu perfil
                  <span className="badge">New</span>
                </div>
              </li>
              <li>
                <div>Preferencias</div>
              </li>
              <li>
                <div onClick={() => logout()}>Salir (Logout)</div>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

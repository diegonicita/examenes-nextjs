'use client'

import React, { useTransition } from 'react'
import Image from 'next/image'
import userNotLogged from '@/app/assets/icon-not-logged.png'
import userLogged from '@/app/assets/icon-logged.png'
import Link from 'next/link'
import { handleLogout } from './helper/handleLogout'

export default function AuthMenu({ isLogged }: { isLogged: boolean }) {
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
                <Link href="/profile" className="justify-center">
                  Ver Perfil
                </Link>
              </li>
              <li>
                <Link href="/plans" className="justify-center">
                  <div>Ver Planes</div>                 
                </Link>
              </li>
              <li>
                <Link href="/consults" className="justify-center">
                  <div>Administrador</div>                 
                </Link>
              </li>
              <li>
                <div className="justify-center" onClick={() => handleLogout()}>Salir</div>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

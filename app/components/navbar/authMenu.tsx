import React from 'react'
import Image from 'next/image'
import user from '@/app/assets/icon-not-logged.png'
import Link from 'next/link'

export default function AuthMenu() {
  return (
    <div>
      <div className="w-auto lg:w-full text-end dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-14 rounded-full">
            <Image alt="Icono del usuario" src={user} />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link href="login">Ingresar</Link>
            {/* <Link href="http://localhost:8126/auth/google-examenes">
              Ingresar
            </a> */}
            {/* <Link href="https://mercado.webapp.ar/auth/google-examenes">
              Ingresar con Google
            </a> */}
          </li>
          <li>
            <Link href="register">Registrarte</Link>
          </li>
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
            <div>Salir (Logout)</div>
          </li>
        </ul>
      </div>
    </div>
  )
}

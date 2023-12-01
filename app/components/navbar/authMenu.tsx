import React from 'react'
import Image from 'next/image'
import user from '@/app/assets/icon-not-logged.png'

export default function AuthMenu() {
  return (
    <section>
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
            <a href="login">Ingresar</a>
            {/* <a href="http://localhost:8126/auth/google-examenes">
              Ingresar
            </a> */}
            {/* <a href="https://mercado.webapp.ar/auth/google-examenes">
              Ingresar con Google
            </a> */}
          </li>
          <li>
            <a>Registrarte</a>
          </li>
          <li>
            <a className="justify-between">
              Ver tu perfil
              <span className="badge">New</span>
            </a>
          </li>
          <li>
            <a>Preferencias</a>
          </li>
          <li>
            <a>Salir (Logout)</a>
          </li>
        </ul>
      </div>
    </section>
  )
}

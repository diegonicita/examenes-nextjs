'use client'

/* Core */
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import user from '@/app/assets/login-icon.png'
import Image from 'next/image'

export const Nav = () => {
  const pathname = usePathname()

  return (
    <div className="bg-base-200 text-base-content">
      <nav className="px-4 pt-4 flex gap-4 sm:w-full max-w-[60rem] mx-auto text-sm items-center justify-center">
        <div role="tablist" className="block sm:flex tabs tabs-lifted tabs-lg">
          <Link
            role="tab"
            className={`tab text-sm ${pathname === '/' ? 'tab-active text-sm' : ''}`}
            href="/"
          >
            Home
          </Link>
          <Link
            role="tab"
            className={`tab text-sm ${pathname === '/tasks' ? 'tab-active text-sm' : ''}`}
            href="/tasks"
          >
            Tareas
          </Link>
          <Link
            role="tab"
            className={`tab text-sm ${pathname === '/verify' ? ' text-sm tab-active' : ''}`}
            href="/verify"            
          >
            Estados
          </Link>
          <Link
            role="tab"
            className={`text-sm tab ${pathname === '/pokemon' ? ' text-sm tab-active' : ''}`}
            href="/pokemon"
          >
            API Pokemon
          </Link>
          <Link
            role="tab"
            className={`text-sm tab ${pathname === '/question' ? 'text-sm tab-active' : ''}`}
            href="/question"
          >
            API Question
          </Link>
          <Link
            role="tab"
            className={`text-sm tab ${pathname === '/products-server' ? 'text-sm tab-active' : ''}`}
            href="/products-server"
          >
            Products
          </Link>
        </div>
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
              <a href="http://localhost:8126/auth/google-examenes">
                Ingresar en Localhost con Google
              </a>
              <a href="https://mercado.webapp.ar/auth/google-examenes">
                Ingresar con Google
              </a>
            </li>
            <li>
              <a>Registrarte</a>
            </li>
            <li>
              <a className="justify-between">
                Ver tu perfil
                {/* <span className="badge">New</span> */}
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
      </nav>
    </div>
  )
}

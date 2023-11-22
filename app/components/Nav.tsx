'use client'

/* Core */
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Nav = () => {
  const pathname = usePathname()

  return (
    <nav className="bg-base-200 text-base-content px-4 pt-4 flex gap-4 sm:w-full">
      <div role="tablist" className="block sm:flex tabs tabs-lifted tabs-lg">
        <Link
          role="tab"
          className={`tab ${pathname === '/' ? 'tab-active' : ''}`}
          href="/"
        >
          Home
        </Link>
        <Link
          role="tab"
          className={`tab ${pathname === '/counter' ? 'tab-active' : ''}`}
          href="/counter"
        >
          Counter
        </Link>
        <Link
          role="tab"
          className={`tab ${pathname === '/verify' ? 'tab-active' : ''}`}
          href="/verify"
        >
          Verify
        </Link>
        <Link
          role="tab"
          className={`tab ${pathname === '/pokemon' ? 'tab-active' : ''}`}
          href="/pokemon"
        >
          Pokemon
        </Link>
        <Link
          role="tab"
          className={`tab ${pathname === '/question' ? 'tab-active' : ''}`}
          href="/question"
        >
          Question
        </Link>
      </div>
      <div className="w-full text-end dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src="/login-icon.png" />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a href="http://localhost:8126/auth/google-examenes">Ingresar en Localhost con Google</a>
            <a href="https://mercado.webapp.ar/auth/google-examenes">Ingresar con Google</a>
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
  )
}

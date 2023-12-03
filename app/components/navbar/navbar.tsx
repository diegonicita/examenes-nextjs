'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AuthMenu from './authMenu'
import AuthBurger from './authBurger'

export const Nav = () => {
  const pathname = usePathname()

  return (
    <div className="bg-base-200 text-base-content">
      <nav className="px-4 pt-4 flex gap-4 sm:w-full max-w-[55rem] mx-auto text-sm items-center justify-between">
        <AuthBurger />
        <div role="tablist" className="hidden sm:flex tabs tabs-lifted tabs-lg">
          <Link
            role="tab"
            className={`tab text-sm ${
              pathname === '/' ? 'tab-active text-sm' : ''
            }`}
            href="/"
          >
            Home
          </Link>
          <Link
            role="tab"
            className={`tab text-sm ${
              pathname === '/tasks' ? 'tab-active text-sm' : ''
            }`}
            href="/tasks"
          >
            Tareas
          </Link>
          <Link
            role="tab"
            className={`tab text-sm ${
              pathname === '/verify' ? ' text-sm tab-active' : ''
            }`}
            href="/verify"
          >
            Estados
          </Link>
          <Link
            role="tab"
            className={`text-sm tab ${
              pathname === '/pokemon' ? ' text-sm tab-active' : ''
            }`}
            href="/pokemon"
          >
            API Pokemon
          </Link>
          <Link
            role="tab"
            className={`text-sm tab ${
              pathname === '/question' ? 'text-sm tab-active' : ''
            }`}
            href="/question"
          >
            API Question
          </Link>
          <Link
            role="tab"
            className={`text-sm tab ${
              pathname === '/products-server' ? 'text-sm tab-active' : ''
            }`}
            href="/products-server"
          >
            Products
          </Link>
        </div>
        <AuthMenu />
      </nav>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AuthMenu from './authMenu'
import AuthBurger from './authBurger'
import { tabs } from './tabs'

export const dynamic = 'force-dynamic'

export const Nav = () => {
  const pathname = usePathname()

  return (
    <div className="bg-base-200 text-base-content">
      <nav className="px-4 pt-4 flex gap-4 sm:w-full max-w-[55rem] mx-auto text-sm items-center justify-between">
        <AuthBurger />
        <div role="tablist" className="hidden sm:flex tabs tabs-lifted tabs-lg">
          {tabs.map((tab, index) => (
            <Link
              key={index}
              role="tab"
              className={`tab text-sm ${
                pathname === tab.path ? 'tab-active text-sm' : ''
              }`}
              href={tab.path}
            >
              {tab.name}
            </Link>
          ))}
        </div>
        <AuthMenu />
      </nav>
    </div>
  )
}

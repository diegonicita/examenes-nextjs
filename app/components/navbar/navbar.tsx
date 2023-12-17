'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AuthMenu from './authMenu'
import AuthBurger from './authBurger'
import { tabs } from './tabs'
import { useCookieInterval } from '@/app/(pages)/(auth)/hooks/useCookieInterval'

export const Nav = () => {
  const pathname = usePathname()
  const { cookie } = useCookieInterval('auth', 1000)

  // useEffect(() => {
  //   console.log('cookie change en NAV')
  //   console.log(cookie)
  // }, [cookie])

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
        <AuthMenu auth={cookie} />
      </nav>
    </div>
  )
}

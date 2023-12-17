'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AuthMenu from './authMenu'
import AuthBurger from './authBurger'
import { tabs } from './tabs'
import { useCookieInterval } from '@/app/(pages)/(auth)/hooks/useCookieInterval'

export const Nav = () => {
  const [isClient, setIsClient] = useState<boolean>(false)
  const pathname = usePathname()
  const { cookie } = useCookieInterval('auth', 1000)

  useEffect(() => {
    if (!isClient) setIsClient(true)
    // console.log('cookie change en NAV')
    // console.log(cookie)
  }, [cookie])

  return (
    <div className="bg-base-200 text-base-content">
      <nav className="px-4 pt-4 flex gap-4 sm:w-full max-w-[55rem] mx-auto text-sm items-center justify-between">
        <AuthBurger />
        <div role="tablist" className="hidden md:flex tabs tabs-lifted tabs-lg">
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
        {isClient && <AuthMenu auth={cookie} />}
      </nav>
    </div>
  )
}

'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Tab = ({ path, name }: { path: string; name: string }) => {
  const pathname = usePathname()
  return (
    <Link
      role="tab"
      className={`tab text-sm ${pathname === path ? 'tab-active text-sm' : ''}`}
      href={path}
    >
      {name}
    </Link>
  )
}

export default Tab

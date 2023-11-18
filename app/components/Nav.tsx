'use client'

/* Core */
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Nav = () => {
  const pathname = usePathname()

  return (
    <nav className="bg-red-100 p-4 flex gap-4 w-full">
      <Link
        className={`bg-red-100 ${pathname === '/' ? 'bg-red-200' : ''}`}
        href="/"
      >
        Home
      </Link>
      <Link
        className={`bg-red-100 ${pathname === '/' ? 'bg-red-200' : ''}`}
        href="/counter"
      >
        Counter
      </Link>
      <Link
        className={`bg-red-100 ${pathname === '/' ? 'bg-red-200' : ''}`}
        href="/verify"
      >
        Verify
      </Link>
      <Link
        className={`bg-red-100 ${pathname === '/' ? 'bg-red-200' : ''}`}
        href="/pokemon"
      >
        Pokemon RTK Query
      </Link>
    </nav>
  )
}

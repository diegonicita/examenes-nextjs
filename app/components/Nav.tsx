'use client'

/* Core */
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Nav = () => {
  const pathname = usePathname()

  return (
    <nav className="bg-base-200 text-base-content px-4 pt-4 flex gap-4 w-full">
      <div role="tablist" className="tabs tabs-lifted tabs-lg">
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
    </nav>
  )
}

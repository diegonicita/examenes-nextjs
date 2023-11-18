'use client'

/* Core */
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/* Instruments */
import styles from '../styles/layout.module.css'

export const Nav = () => {
  const pathname = usePathname()

  return (
    <nav className="bg-red-100 p-4 flex gap-4 w-full">
      <Link
        className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
        href="/"
      >
        Home
      </Link>
      <Link
        className={`${styles.link} ${
          pathname === '/counter' ? styles.active : ''
        }`}
        href="/counter"
      >
        Counter
      </Link>
      <Link
        className={`${styles.link} ${
          pathname === '/verify' ? styles.active : ''
        }`}
        href="/verify"
      >
        Verify
      </Link>
      <Link
        className={`${styles.link} ${
          pathname === '/pokemon' ? styles.active : ''
        }`}
        href="/pokemon"
      >
        Pokemon RTK Query
      </Link>
    </nav>
  )
}

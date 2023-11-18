'use client'

/* Core */
import { usePathname } from 'next/navigation'

export const Footer = () => {
  const pathname = usePathname()

  return (
    <footer className="p-4 bg-blue-200 mt-4">
      <span>Learn </span>
      <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
        React
      </a>
      <span>, </span>
      <a href="https://redux.js.org/" target="_blank" rel="noopener noreferrer">
        Redux
      </a>
      <span>, </span>
      <a
        href="https://redux-toolkit.js.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Redux Toolkit
      </a>
      ,<span> and </span>
      <a
        href="https://react-redux.js.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        React Redux
      </a>
    </footer>
  )
}

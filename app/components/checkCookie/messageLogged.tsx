import React from 'react'
import Link from 'next/link'

const MessageLogged = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-xl pb-4">
        Ya iniciaste sesion ¿Quieres {' '}
        <Link href="/logout" className="underline">
          desloguearte
        </Link>
        ?
      </div>
    </div>
  )
}

export default MessageLogged

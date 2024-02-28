import React from 'react'
import Link from 'next/link'

const MessageNotLogged = () => {
  return (
    <div className="flex items-center justify-center h-screen mx-10">
      <div>
        <div className="text-sm pb-4">
          No iniciaste sesion todavia, por favor,{' '}
          <Link href="/login" className="underline">
            inicia sesion
          </Link>
        </div>
        <div className="text-sm pb-40">
          Si aun no estas registrado,{' '}
          <Link href="/register" className="underline">
            crea una cuenta
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MessageNotLogged

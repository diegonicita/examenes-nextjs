import React from 'react'
import Link from 'next/link'

const MessageNotLogged = () => {
  return (
    <div className="flex items-center justify-center h-screen mx-10">
      <div>
        <div className="text-xl pb-4">
          Verificaste tu cuenta:{' '}
          <Link href="/login" className="underline">
            Inicia sesion nuevamente
          </Link>
        </div>
        <div className="text-xl pb-40">
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

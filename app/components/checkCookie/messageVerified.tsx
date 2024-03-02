import React from 'react'
import Link from 'next/link'

const MessageVerified = () => {
  return (
    <div className="flex items-center justify-center mx-10">
      <div className="text-center text-xl pb-4">
        Tu cuenta ya esta verificada.{' '}
        <Link href="/profile" className="underline">
          Regresar a tu perfil
        </Link>
      </div>
    </div>
  )
}

export default MessageVerified

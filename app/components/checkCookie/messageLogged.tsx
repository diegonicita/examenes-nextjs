import React from 'react'
import Link from 'next/link'
import { handleLogout } from '@/app/components/navbar/helper/handleLogout'

const MessageLogged = () => {
  return (
    <div className="flex items-center justify-center mx-10">
      <div className="text-center text-xl pb-4">
        Ya iniciaste sesion ¿Quieres{' '}
        <Link href="/logout" className="underline">
          desloguearte
        </Link>
        ?
      </div>
    </div>
  )
}

export default MessageLogged

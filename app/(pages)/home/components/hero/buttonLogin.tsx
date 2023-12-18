'use client'

import Cookies from 'js-cookie'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const ButtonLogin = () => {
  const [isClient, setIsClient] = useState(false)
  const [auth, setAuth] = useState<string | undefined>('')

  useEffect(() => {
    setAuth(Cookies.get('auth'))
    setIsClient(true)
  }, [])

  return (
    <>
      {!auth && isClient && (
        <Link
          href="/login"
          className="btn btn-accent text-accent-content w-[188px] h-[62px] flex-col justify-center 
        items-center inline-flex px-[31px] py-[17px] text-md"
        >
          Ingresa a tu cuenta
        </Link>
      )}
    </>
  )
}

export default ButtonLogin

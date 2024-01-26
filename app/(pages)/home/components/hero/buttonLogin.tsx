'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const ButtonLogin = () => {
  return (
    <Link
      href="/login"
      className="btn btn-accent text-accent-content w-[188px] h-[48px] flex-col justify-center 
        items-center inline-flex px-[31px] py-[17px] text-md"
    >
      Ingresa a tu cuenta
    </Link>
  )
}

export default ButtonLogin

'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const ButtonLogin = () => {
  return (
    <Link
      href="/login"
      className="btn btn-neutral text-neutral-content w-48 justify-center 
         text-lg rounded-3xl mb-8"
    >
      Ingresar
    </Link>
  )
}

export default ButtonLogin

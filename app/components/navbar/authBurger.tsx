'use client'

import React from 'react'
import Image from 'next/image'
import userNotLogged from '@/app/assets/icon-not-logged.png'
import userLogged from '@/app/assets/icon-logged.png'
import burger from '@/app/assets/burger.svg'
import Link from 'next/link'
import { useLogged } from '@/app/(pages)/(auth)/hooks/useLogged'
import { userSlice, useDispatch } from '@/app/lib/redux'

export default function AuthBurger() {
  // const { isLogged, logout } = useLogged(undefined)

  return (
    <>
      <div className="w-auto sm:hidden text-end dropdown dropdown-start">
        <label tabIndex={0} className="btn btn-ghost">
          <div className="w-8 rounded-full">
            <Image alt="Icono del usuario" src={burger} />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/tasks">Tareas</Link>
          </li>
          <li>
            <Link href="/verify">Estados</Link>
          </li>
          <li>
            <Link href="/pokemon">Api Pokemon</Link>
          </li>
          <li>
            <Link href="/question">Api Question</Link>
          </li>
          <li>
            <Link href="/products-server">Products</Link>
          </li>
        </ul>
      </div>
    </>
  )
}

'use client'

import React from 'react'
import Image from 'next/image'
import burger from '@/app/assets/burger.svg'
import Link from 'next/link'
import { tabs } from './tabs'

export default function AuthBurger() {
  return (
    <>
      <div className="w-auto md:hidden text-end dropdown dropdown-start">
        <label tabIndex={0} className="btn btn-ghost">
          <div className="w-8 rounded-full">
            <Image alt="Icono del usuario" src={burger} />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          {tabs.map((tab, index) => (
            <li key={index}>
              <Link href={tab.path}>{tab.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

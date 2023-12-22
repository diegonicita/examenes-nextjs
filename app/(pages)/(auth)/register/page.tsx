'use client'

import Client from './components/client'
import { useLogged } from '@/app/(pages)/(auth)/hooks/useLogged'

export default function Register() {
  
  // useLogged('redirect')

  return (
    <div className="mt-8 hero-content mx-auto max-w-sm">
      <div className="mt-8 hero-content mx-auto max-w-sm">
        <div className="flex flex-col justify-stretch items-stretch gap-4">
          <Client />
        </div>
      </div>
    </div>
  )
}

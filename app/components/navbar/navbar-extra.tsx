import { auth, signIn, signOut } from 'auth'
import Link from 'next/link'
import React from 'react'
import AuthMenu from './authMenu'

async function NavBarExtra() {
  const session = await auth()

  return (
    <div className="bg-gradient-to-b from-slate-300 to-slate-200 flex">
      <Link className="p-4" href={'/'}>
        Inicio
      </Link>
      <Link className="p-4" href={'/exams'}>
        Examenes
      </Link>
      <Link className="p-4" href={'/clientPage'}>
        Temas
      </Link>
      <Link className="p-4" href={'/progress'}>
        Progreso
      </Link>
      <Link className="p-4" href={'/questions'}>
        Buscador
      </Link>
      <Link className="p-4" href={'/clientPage'}>
        Client
      </Link>
      <Link className="p-4" href={'/serverPage'}>
        Server
      </Link>
      <Link className="p-4" href={'/middlewareProtected'}>
        Middleware
      </Link>
      <Link className="p-4" href={'/consults'}>
        Admin
      </Link>
      <div className="ml-auto bg-red-100 flex items-center px-2">
        <div>{session && session.user && <p>{session.user.name}</p>}</div>
        <AuthMenu isLogged={session ? true : false} />
      </div>
      <div className="py-4 px-2 pr-8 gap-2 bg-red-100">
        {session && session.user ? (
          <div className="flex gap-2">
            <form
              action={async () => {
                'use server'
                await signOut()
              }}
            >
              <button type="submit">Salir</button>
            </form>
          </div>
        ) : (
          <form
            action={async () => {
              'use server'
              await signIn(undefined, { callbackUrl: '/' })
            }}
          >
            <button type="submit">Inicia Sesión</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default NavBarExtra

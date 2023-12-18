import { refreshAction } from '@/app/(pages)/consults/actions/refresh'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import Link from 'next/link'
import { ReactNode } from 'react'

const CheckServerCookie = ({
  auth,
  children,
}: {
  auth: RequestCookie | undefined
  children: ReactNode
}) => {
  if (!auth) {
    const formData = new FormData()
    formData.append('auth', 'false')
    refreshAction(formData)
  }
  return (
    <>
      {auth && auth?.value && (
        <div>
          {children}
        </div>
      )}
      {!auth && (
        <div className="flex items-center justify-center h-screen">
          <div>
            <div className="text-xl pb-4">
              No estas autorizado para ver esta pagina, por favor{' '}
              <Link href="/login" className="underline">
                inicia sesion
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
      )}
    </>
  )
}

export default CheckServerCookie

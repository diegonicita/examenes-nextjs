import { refreshAction } from '@/app/(pages)/consults/actions/refresh'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import type { ReactNode } from 'react'
import MessageNotLogged from './messageNotLogged'
import type { UserType } from '@/app/models/User'

const CheckServerCookie = ({
  auth,
  children,
}: {
  auth: UserType | null
  children: ReactNode
}) => {
  if (!auth) {
    const formData = new FormData()
    formData.append('auth', 'false')
    refreshAction()
  }
  return (
    <>
      {auth && <div>{children}</div>}
      {!auth && <MessageNotLogged />}
    </>
  )
}

export default CheckServerCookie

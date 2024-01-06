import { refreshAction } from '@/app/(pages)/consults/actions/refresh'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { ReactNode } from 'react'
import MessageNotLogged from './messageNotLogged'

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
      {auth && auth?.value && <div>{children}</div>}
      {!auth && <MessageNotLogged />}
    </>
  )
}

export default CheckServerCookie

import { refreshAction } from '@/app/(pages)/consults/actions/refresh'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { ReactNode } from 'react'
import MessageNotLogged from './messageNotLogged'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'

const CheckServerCookie = async ({ children }: { children: ReactNode }) => {
  const payload = await getInfoAuthCookie()

  if (!payload) {
    const formData = new FormData()
    formData.append('auth', 'false')
    refreshAction()
  }
  return (
    <>
      {payload && <div>{children}</div>}
      {!payload && <MessageNotLogged />}
    </>
  )
}

export default CheckServerCookie

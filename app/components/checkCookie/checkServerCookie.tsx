import { refreshAction } from '@/app/(pages)/consults/actions/refresh'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
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
    <div>
      {auth && auth?.value && <>{children}</>}
      {!auth && <div> Not Allowed </div>}
    </div>
  )
}

export default CheckServerCookie

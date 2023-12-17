import { refreshAction } from '@/app/(pages)/consults-server/actions/refresh'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { ReactNode } from 'react'
import NotAllowed from '@/app/components/notAllowed/notAllowed'

const CheckServerCookie = ({
  auth,
  children, 
}: {
  auth: RequestCookie | undefined
  children: ReactNode, 
}) => {
  if (!auth) {
    const formData = new FormData()
    formData.append('auth', 'false')
    refreshAction(formData)    
  }
  return (
    <div>
      {auth && auth?.value && <>{children}</>}
      {!auth && <NotAllowed />}
    </div>
  )
}

export default CheckServerCookie

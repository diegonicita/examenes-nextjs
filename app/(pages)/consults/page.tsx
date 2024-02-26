import DisplayConsults from '@/app/(pages)/consults/displayConsults'
import Chat from '../consults/components/chat/chat'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import { auth } from '@clerk/nextjs'
import { deleteAction } from '@/app/(pages)/consults/actions/delete'
import { Suspense } from 'react'
import { headers } from 'next/headers'

async function User() {
  const { userId } = auth()
  const payload = await getInfoAuthCookie(userId)
  return (
    <>
      {payload && (
        <div>
          {payload.role === 'admin' && (
            <DisplayConsults deleteAction={deleteAction} />
          )}
          {payload.role === 'admin' && (
            <Chat email={payload?.email} username={payload?.username} />
          )}
        </div>
      )}
      {payload && payload.role !== 'admin' && (
        <div className="flex items-center justify-center h-screen">
          <div>
            <div className="text-xl pb-4">
              No estas autorizado para ver esta pagina. Habla con el
              administrador.
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const Page = async () => {
  const forwardedFor = headers().get('x-forwarded-for')
  return (
    <Suspense fallback={null}>
      <User />
    </Suspense>
  )
}

export const metadata = {
  title: 'Admin Only',
}

export default Page

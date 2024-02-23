import DisplayConsults from '@/app/(pages)/consults/displayConsults'
import Chat from '../consults/components/chat/chat'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import { UserType } from '@/app/models/User'

const Page = async () => {
  const authData = await getInfoAuthCookie()
  console.log(authData?.role, 'role')
  return (
    <>
      {authData && (
        <div>
          {authData.role === 'admin' && <DisplayConsults />}
          {authData.role === 'admin' && (
            <Chat email={authData?.email} username={authData?.username} />
          )}
        </div>
      )}
      {authData && authData.role !== 'admin' && (
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

export const metadata = {
  title: 'Admin Only',
}

export default Page

import DisplayConsults from '@/app/(pages)/consults/displayConsults'
import Chat from '../consults/components/chat/chat'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import { UserType } from '@/app/models/User'

const Page = async () => {
  const authData = await getInfoAuthCookie()

  return (
    <>
      <DisplayConsults />
      {authData && (
        <Chat email={authData?.email} username={authData?.username} />
      )}
    </>
  )
}

export const metadata = {
  title: 'Admin Only',
}

export default Page

import DisplayConsults from '@/app/(pages)/consults/displayConsults'
import CheckServerCookie from '@/app/components/checkCookie/checkServerCookie'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'

const Page = async () => {
  const auth = await getInfoAuthCookie()

  return (
    <div>
      <CheckServerCookie auth={auth}>
        {auth && <DisplayConsults auth={auth} />}
      </CheckServerCookie>
    </div>
  )
}

export const metadata = {
  title: 'Admin Only',
}

export default Page

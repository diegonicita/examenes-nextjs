import DisplayConsults from '@/app/(pages)/consults/components/display/displayConsults'
import CheckServerCookie from '@/app/components/checkCookie/checkServerCookie'
import CheckClientCookie from '@/app/components/checkCookie/checkClientCookie'
import { cookies } from 'next/headers'

const Page = async () => {
  const auth = cookies().get('auth')  

  return (
    <div>
      <CheckClientCookie auth={auth} />
      <CheckServerCookie auth={auth}>
        <DisplayConsults auth={auth}/>
      </CheckServerCookie>
    </div>
  )
}

export const metadata = {
  title: 'Consultas',
}

export default Page

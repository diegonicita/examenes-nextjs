import DisplayConsults from '@/app/(pages)/consults/displayConsults'
import CheckServerCookie from '@/app/components/checkCookie/checkServerCookie'
import { cookies } from 'next/headers'

const Page = async () => {
  const auth = cookies().get('auth')  

  return (
    <div>
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

import DisplayConsults from '@/app/(pages)/consults-server/components/displayConsults'
import { unstable_noStore as noStore } from 'next/cache'
export const dynamic = 'force-dynamic'
import { Router } from 'next/router'
import { cookies } from 'next/headers'
import { refreshAction } from './actions/refresh'

const Page = async () => {
  const auth = cookies().get('auth') 
  if (!auth) {
    const formData = new FormData()
    formData.append('auth', 'false')    
    refreshAction(formData)
    console.log('refresh desde consults-server')
  } 
  noStore() 
  return (
    <div>
      <DisplayConsults />
    </div>
  )
}

export const metadata = {
  title: 'Productos Server',
}

export default Page

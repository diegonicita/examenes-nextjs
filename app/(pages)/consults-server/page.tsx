import DisplayConsults from '@/app/(pages)/consults-server/components/displayConsults'
import { unstable_noStore as noStore } from 'next/cache'
import CheckCookie from '../../components/checkCookie/checkCookie'
export const dynamic = 'force-dynamic'

const Page = async () => {
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

import DisplayConsults from '@/app/(pages)/consults/displayConsults'
import CheckServerCookie from '@/app/components/messages/checkServerCookie'

const Page = async () => {
  return (
    <div>
      <CheckServerCookie>
        <DisplayConsults />
      </CheckServerCookie>
    </div>
  )
}

export const metadata = {
  title: 'Admin Only',
}

export default Page

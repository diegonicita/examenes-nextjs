import MessageNotLoggedVerify from '@/app/components/checkCookie/messageNotLoggedVerify'
import MessageVerified from '@/app/components/checkCookie/messageVerified'
import VerifyFormContainer from '@/app/components/form/verify/container'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'

export default async function Verify() {
  const email = process.env.USER_EMAIL
  const password = process.env.USER_PASSWORD
  const payload = await getInfoAuthCookie()

  const isVerify = payload?.verify ? true : false
  const isLogged = payload ? true : false

  return (
    <div className="mt-8 hero-content mx-auto max-w-lg">
      <div className="mt-8 hero-content mx-auto max-w-lg">
        <div className="flex flex-col">Redirect Page</div>
      </div>
    </div>
  )
}

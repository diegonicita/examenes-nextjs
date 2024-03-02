import MessageNotLoggedVerify from '@/app/components/checkCookie/messageNotLoggedVerify'
import MessageVerified from '@/app/components/checkCookie/messageVerified'
import VerifyFormContainer from '@/app/components/form/verifyFormContainer'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'

export default async function Verify() {
  const email = process.env.USER_EMAIL
  const password = process.env.USER_PASSWORD
  const payload = await getInfoAuthCookie()

  const isVerify = payload?.verify ? true : false
  const isLogged = payload ? true : false

  return (
    <>
      {isLogged && (
        <div className="mt-8 hero-content mx-auto max-w-sm">
          <div className="mt-8 hero-content mx-auto max-w-sm">
            <div className="flex flex-col justify-stretch items-stretch gap-4">
              <VerifyFormContainer
                initialEmail={email}
                initialPassword={password}
                disabled={isVerify}
              />
            </div>
          </div>
        </div>
      )}
      {isVerify && isLogged && <MessageVerified />}
      {!isLogged && <MessageNotLoggedVerify />}
    </>
  )
}

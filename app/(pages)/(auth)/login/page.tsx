import MessageLogged from '@/app/components/messages/messageLogged'
import LoginFormContainer from '@/app/components/form/loginFormContainer'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'

export default async function Login() {
  const email = process.env.USER_EMAIL
  const password = process.env.USER_PASSWORD
  const payload = await getInfoAuthCookie()
  const isLogged = payload ? true : false
  return (
    <>
      <div className="hero-content mx-auto max-w-sm pb-0 mb-0">
        <div className="hero-content mx-auto max-w-sm">
          <div className="flex flex-col justify-stretch items-stretch gap-4">
            <LoginFormContainer
              initialEmail={email}
              initialPassword={password}
              disabled={isLogged}
            />
          </div>
        </div>
      </div>
      {isLogged && <MessageLogged />}
    </>
  )
}

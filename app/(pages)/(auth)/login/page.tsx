import MessageLogged from '@/app/components/checkCookie/messageLogged'
import LoginFormContainer from '@/app/components/form/login/container'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'

export default async function Login() {
  const email = process.env.USER_EMAIL
  const password = process.env.USER_PASSWORD
  const auth = await getInfoAuthCookie()
  const isLogged = auth ? true : false
  return (
    <>
      <div className="mt-8 hero-content mx-auto max-w-sm">
        <div className="mt-8 hero-content mx-auto max-w-sm">
          <div className="flex flex-col justify-stretch items-stretch gap-4">
            <LoginFormContainer
              urlLoginWithGoogle={process.env.URL_LOGIN_WITH_GOOGLE}
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

import MessageLogged from '@/app/components/checkCookie/messageLogged'
import LoginFormContainer from '@/app/components/form/login/container'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import Container from '@/app/components/container/container'

export default async function Login() {
  const email = process.env.USER_EMAIL
  const password = process.env.USER_PASSWORD
  const auth = await getInfoAuthCookie()
  const isLogged = auth ? true : false
  return (
    <>
      <div className="hero-content mx-auto max-w-sm">
        <div className="hero-content mx-auto max-w-sm">
          <div className="flex flex-col justify-stretch items-stretch gap-4">
            <Container title="¡Bienvenido a Exámenes!" subtitle="Ingresa tus credenciales">
              <LoginFormContainer
                urlLoginWithGoogle={process.env.URL_LOGIN_WITH_GOOGLE}
                initialEmail={email}
                initialPassword={password}
                disabled={isLogged}
              />
            </Container>
          </div>
        </div>
      </div>
      {isLogged && <MessageLogged />}
    </>
  )
}

import MessageLogged from '@/app/components/checkCookie/messageLogged'
import RegisterFormContainer from '@/app/components/form/register/container'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import Container from '@/app/components/container/container'

export default async function Register() {
  const auth = await getInfoAuthCookie()
  const isLogged = auth ? true : false
  return (
    <>
      <div className="mt-0 hero-content mx-auto max-w-sm pb-0">
        <div className="mt-0 hero-content mx-auto max-w-sm pb-2">
          <div className="flex flex-col justify-stretch items-stretch gap-4">
          <Container title="¡Bienvenido a Exámenes!" subtitle="Ingresa tus datos para crear una cuenta">
            <RegisterFormContainer disabled={isLogged} />
            </Container>
          </div>
        </div>
      </div>
      {isLogged && <MessageLogged />}
    </>
  )
}

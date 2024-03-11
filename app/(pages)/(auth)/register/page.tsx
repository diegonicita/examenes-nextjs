import MessageLogged from '@/app/components/checkCookie/messageLogged'
import RegisterFormContainer from '@/app/components/form/register/container'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'

export default async function Register() {
  const auth = await getInfoAuthCookie()
  const isLogged = auth ? true : false
  return (
    <>
      <div className="mt-0 hero-content mx-auto max-w-sm pb-0">
        <div className="mt-0 hero-content mx-auto max-w-sm pb-2">
          <div className="flex flex-col justify-stretch items-stretch gap-4">
            <RegisterFormContainer disabled={isLogged} />
          </div>
        </div>
      </div>
      {isLogged && <MessageLogged />}
    </>
  )
}

import { cookies } from 'next/headers'
import MessageLogged from '@/app/components/messages/messageLogged'
import RegisterFormContainer from '@/app/components/form/registerFormContainer'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'

export default async function Register() {
  const payload = await getInfoAuthCookie()
  const isLogged = payload ? true : false
  return (
    <>
      <div className="hero-content mx-auto max-w-sm pb-0">
        <div className="hero-content mx-auto max-w-sm pb-2">
          <div className="flex flex-col justify-stretch items-stretch gap-4">
            <RegisterFormContainer disabled={isLogged} />
          </div>
        </div>
      </div>
      {isLogged && <MessageLogged />}
    </>
  )
}

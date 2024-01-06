import Client from './components/client'
import { cookies } from 'next/headers'
import MessageLogged from '@/app/components/checkCookie/messageLogged'

export default function Login() {
  const email = process.env.USER_EMAIL
  const password = process.env.USER_PASSWORD
  const auth = cookies().get('auth')
  const isLogged = auth ? true : false
  return (
    <>
      <div className="mt-8 hero-content mx-auto max-w-sm">
        <div className="mt-8 hero-content mx-auto max-w-sm">
          <div className="flex flex-col justify-stretch items-stretch gap-4">
            <Client
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

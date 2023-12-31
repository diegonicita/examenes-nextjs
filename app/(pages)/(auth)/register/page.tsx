import Client from './components/client'
import { cookies } from 'next/headers'
import MessageLogged from '@/app/components/checkCookie/messageLogged'

export default function Register() {
  const auth = cookies().get('auth')
  const isLogged = auth ? true : false
  return (
    <>
      <div className="mt-0 hero-content mx-auto max-w-sm pb-0">
        <div className="mt-0 hero-content mx-auto max-w-sm pb-2">
          <div className="flex flex-col justify-stretch items-stretch gap-4">
            <Client disabled={isLogged} />
          </div>
        </div>
      </div>
      {isLogged && <MessageLogged />}
    </>
  )
}

import Question from '@/app/(pages)/question/components/question'
import { cookies } from 'next/headers'
import CheckClientCookie from '@/app/components/checkCookie/checkClientCookie'
import CheckServerCookie from '@/app/components/checkCookie/checkServerCookie'

export default function QuestionPage() {
  const auth = cookies().get('auth')

  return (
    <div>
      <CheckClientCookie auth={auth} />
      <CheckServerCookie auth={auth}>
        <div className="flex flex-col items-start px-8 max-w-[60rem] mx-auto mt-8">
          <Question />
        </div>
      </CheckServerCookie>
    </div>
  )
}

export const metadata = {
  title: 'Preguntas desde API',
}

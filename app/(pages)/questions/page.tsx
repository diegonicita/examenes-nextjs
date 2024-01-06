import Question from '@/app/(pages)/questions/components/question'
import { cookies } from 'next/headers'
import CheckServerCookie from '@/app/components/checkCookie/checkServerCookie'

export default function QuestionPage() {
  const auth = cookies().get('auth')

  return (
    <div>
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

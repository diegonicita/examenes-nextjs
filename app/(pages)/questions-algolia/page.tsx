import Searchbar from '@/app/(pages)/questions-algolia/components/searchbar'
import QuestionList from '@/app/(pages)/questions/components/questions/questions'
import { cookies } from 'next/headers'
import CheckServerCookie from '@/app/components/checkCookie/checkServerCookie'
import Pagination from '@/app/(pages)/questions/components/pagination'

export default function QuestionPage({
  searchParams,
}: {
  searchParams?: {
    page?: string
    query?: string
  }
}) {
  const auth = cookies().get('auth')  
  return (
    <div>
      <CheckServerCookie auth={auth}>
        <div className="flex flex-col items-start px-8 max-w-[60rem] mx-auto mt-8">
          <div className="mx-auto">
            <Searchbar />
          </div>
        </div>
      </CheckServerCookie>
    </div>
  )
}

export const metadata = {
  title: 'Preguntas desde API',
}

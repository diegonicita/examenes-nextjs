import SearchQuestion from '@/app/(pages)/questions/components/searchQuestions'
import QuestionList from '@/app/(pages)/questions/components/questionList'
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
  const currentPage = Number(searchParams?.page) || 1
  const query = searchParams?.query || ''

  return (
    <div>
      <CheckServerCookie auth={auth}>
        <div className="flex flex-col items-start px-8 max-w-[60rem] mx-auto mt-8">
          <div className="mx-auto">
            <SearchQuestion />
          </div>
          {/* {query !== '' && query.length > 2 && ( */}
            <>
              <Pagination />
              <QuestionList query={query} currentPage={currentPage} />
              <Pagination />
            </>
          {/* )} */}
        </div>
      </CheckServerCookie>
    </div>
  )
}

export const metadata = {
  title: 'Preguntas desde API',
}

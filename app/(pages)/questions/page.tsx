import Questions from '@/app/(pages)/questions/components/questions/questions'
import { cookies } from 'next/headers'
import CheckServerCookie from '@/app/components/checkCookie/checkServerCookie'
import Pagination from '@/app/(pages)/questions/components/pagination'
import searchQuestions from './actions/searchQuestions'
import searchWordsSuggestions from './actions/searchWordsSuggestions'
import SearchContainer from './components/searchContainer'

export default async function QuestionPage({
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
  let queries: string | string[]
  if (query) {
    // Divide la cadena en un array de palabras si no está vacía
    queries = query.split(' ')
  } else {
    // Si la cadena está vacía, establece el array de consultas como un array vacío
    queries = []
  }
  const resultQueryLimit10 = await searchQuestions(queries)
  let wordsSuggestions = await searchWordsSuggestions(queries)

  return (
    <div>
      <CheckServerCookie auth={auth}>
        <div className="flex flex-col items-start px-8 max-w-[60rem] mx-auto mt-8">
          <SearchContainer
            query={query}
            result={resultQueryLimit10}
            currentPage={currentPage}
            wordsSuggestions={wordsSuggestions}
          >
            {query !== '' && query.length > 2 && (
              <>
                {/* <Pagination /> */}
                <Questions
                  query={query}
                  result={resultQueryLimit10}
                  currentPage={currentPage}
                />
                {/* <Pagination /> */}
              </>
            )}
          </SearchContainer>
        </div>
      </CheckServerCookie>
    </div>
  )
}

export const metadata = {
  title: 'Preguntas desde API',
}

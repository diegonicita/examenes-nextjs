import { cookies } from 'next/headers'
import CheckServerCookie from '@/app/components/checkCookie/checkServerCookie'
import searchQuestions from './actions/searchQuestions'
import searchWordsSuggestions from './actions/searchWordsSuggestions'
import SearchContainer from './components/searchContainer'
import searchValorations from './actions/searchValoration'
import Examen from './components/choices/examen'

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

  const questions = await searchQuestions(queries)
  let valorations = undefined
  if (auth) valorations = await searchValorations(questions)
  const wordsSuggestions = await searchWordsSuggestions(queries)

  return (
    <div>
      <CheckServerCookie auth={auth}>
        <div className="flex flex-col items-start max-w-[60rem] mx-auto mt-8">
          <SearchContainer
            query={query}
            currentPage={currentPage}
            wordsSuggestions={wordsSuggestions}
          >
            {query !== '' && query.length > 2 && (
              <>
                {/* <Pagination /> */}
                {/* <Questions questions={questions} valorations={valorations} />*/}
                <Examen data={questions} valorations={valorations} />
              </>
            )}
          </SearchContainer>
        </div>
      </CheckServerCookie>
    </div>
  )
}

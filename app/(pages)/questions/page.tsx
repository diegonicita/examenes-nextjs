import { cookies } from 'next/headers'
import CheckServerCookie from '@/app/components/checkCookie/checkServerCookie'
import searchQuestions from './actions/searchQuestions'
import searchWordsSuggestions from './actions/searchWordsSuggestions'
import SearchContainer from './components/searchbar/searchContainer'
import searchValorations from './actions/searchValoration'
import type { QuestionSQL } from '@/app/models/QuestionSQL'
import Question from './components/questions/question'
import Valorations from './components/social/valorations/valorations'
import ValorationButton from './components/social/valorations/valorationButton'
import CommentContainer from './components/social/comments/commentContainer'

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
  let valorations: undefined = undefined
  if (auth) valorations = await searchValorations(questions)
  const wordsSuggestions = await searchWordsSuggestions(queries)
  // console.log(wordsSuggestions)

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
                {questions &&
                  questions.map((item: QuestionSQL, index: number) => (
                    <div
                      key={index}
                      className=" border border-gray-400 rounded my-4 px-4 pb-4"
                    >
                      <Question item={item} />
                      {valorations && (
                        <>
                          <Valorations
                            id_question={item.id}
                            valorations={valorations}
                          />
                          <div className="flex flex-wrap gap-4">
                            <ValorationButton id_question={item.id} />
                            <CommentContainer />
                          </div>
                        </>
                      )}
                    </div>
                  ))}
              </>
            )}
          </SearchContainer>
        </div>
      </CheckServerCookie>
    </div>
  )
}

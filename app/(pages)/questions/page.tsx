import { cookies } from 'next/headers'
import CheckServerCookie from '@/app/components/checkCookie/checkServerCookie'
import searchQuestions from './actions/searchQuestions'
import searchWordsSuggestions from './actions/searchWordsSuggestions'
import SearchContainer from './components/searchContainer'
import searchValorations from './actions/searchValoration'
import type { Question as QuestionType } from '@/app/models/Question'
import Question from './components/choices/question'
import Valorations from './components/questions/valorations'
import ValorationButton from './components/questions/valorationButton'
import CommentContainer from './components/questions/commentContainer'

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
                  questions.map((item: QuestionType, index: number) => (
                    <div
                      key={index}
                      className=" border border-gray-400 rounded my-4 px-4 pb-4"
                    >
                      <Question
                        title={'Pregunta N°' + item.numero}
                        questionNumber={item.numero}
                        description={item.texto}
                        year={item.ano}
                        correct={item.correcta}
                        options={[
                          item.opcion1,
                          item.opcion2,
                          item.opcion3,
                          item.opcion4,
                          item.opcion5,
                        ]}
                        image={''}
                      />
                      {valorations && (
                        <>
                          <Valorations
                            id_question={item.id}
                            valorations={valorations}
                          />
                          <ValorationButton id_question={item.id} />
                          <CommentContainer />
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

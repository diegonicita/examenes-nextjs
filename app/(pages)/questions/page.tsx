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
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import { UserType } from '@/app/models/User'
import searchComments from './actions/searchComments'
import RenderTree from './components/social/comments/renderTree'
import FirstInputComment from './components/social/comments/firstInputComment'
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
  const authData = (await getInfoAuthCookie()) as UserType
  let queries: string | string[]
  console.log(authData, 'user')
  if (query) {
    // Divide la cadena en un array de palabras si no está vacía
    queries = query.split(' ')
  } else {
    // Si la cadena está vacía, establece el array de consultas como un array vacío
    queries = []
  }

  const searchQuestionsResult = await searchQuestions(queries)
  const questions = searchQuestionsResult?.resultQueryLimit10
  const questionsCount = searchQuestionsResult?.resultLength
  //console.log(questions)
  let valorations: undefined = undefined
  if (auth) valorations = await searchValorations(questions)
  //console.log(valorations)
  const wordsSuggestions = await searchWordsSuggestions(queries)

  // Comments //
  let treeComments = {} as any

  if (auth) {
    const result = await searchComments(questions)
    console.log(result)
    treeComments = {
      ...(result && result.tree ? result.tree : null),
    }
  }

  console.log(treeComments[168])

  // console.log(comments)
  // let arbol = {} as any
  // if (comments)
  //   Object.keys(comments).map((key) => {
  //     const temp = {} as any
  //     if (comments) temp[key] = createTree(comments[key])
  //     arbol[key] = temp[key][key]
  //   })
  //   console.log(arbol[120][0]?.comment)
  //   console.log(arbol[120][1]?.comment)
  //   console.log(arbol[120][2]?.comment)
  //   console.log(arbol[120][0]?.children)
  //   console.log(arbol[120][0]?.children[0])
  //   console.log(arbol[120][0]?.children[1])
  //   console.log(arbol[120][0]?.children[2])
  //   console.log(arbol[120][1]?.children)
  //   console.log(arbol[120][1]?.children[0])
  //   console.log(arbol[120][1]?.children[1])
  //   console.log(arbol[120][0]?.children[0]?.children)
  //   console.log(arbol[120][0]?.children[1]?.children[0])
  //   console.log(arbol[120][0]?.children[1]?.children[1])

  return (
    <div>
      <CheckServerCookie auth={auth}>
        <div className="flex flex-col items-start max-w-[60rem] mx-auto mt-8">
          <SearchContainer
            query={query}
            currentPage={currentPage}
            wordsSuggestions={wordsSuggestions}
            questionsCount={questionsCount}
          >
            {query !== '' && query.length > 2 && (
              <>
                {questions &&
                  questions.map((item: QuestionSQL, index: number) => (
                    <div
                      key={index}
                      className=" border border-gray-400 rounded my-4 px-4 pb-4"
                    >
                      <Question item={item} userId={authData.id} />
                      {valorations && (
                        <>
                          <Valorations
                            id_question={item.id}
                            valorations={valorations}
                          />
                          <div className="flex flex-wrap gap-4">
                            <ValorationButton id_question={item.id} />
                          </div>
                          <div className="collapse bg-base-200 mt-4">
                            <input type="checkbox" />
                            <div className="collapse-title text-xl font-medium">
                              Comentarios
                            </div>
                            <div className="collapse-content">
                              <FirstInputComment
                                questionId={item.id}
                                parentId={null}
                                depth={1}
                              />
                              <RenderTree
                                tree={treeComments[item.id]}
                                parentId={null}
                                depth={1}
                                currentUser={authData}
                              />
                              {treeComments[item.id] === undefined && (
                                <div> No hay comentarios </div>
                              )}
                            </div>
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

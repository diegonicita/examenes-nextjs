import Questions from '@/app/(pages)/questions/components/questions/questions'
import Words from '@/app/(pages)/questions/components/words/words'
import { cookies } from 'next/headers'
import CheckServerCookie from '@/app/components/checkCookie/checkServerCookie'
import Pagination from '@/app/(pages)/questions/components/pagination'
import searchQuestions from './actions/search'
import Container from './components/container'

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
  let result = await searchQuestions(queries)

  return (
    <div>
      <CheckServerCookie auth={auth}>
        <div className="flex flex-col items-start px-8 max-w-[60rem] mx-auto mt-8">
          <Container query={query} result={result} currentPage={currentPage}>            
            {query !== '' && query.length > 2 && (
              <>
                {/* <Pagination /> */}                
                <Questions
                  query={query}
                  result={result}
                  currentPage={currentPage}
                />
                {/* <Pagination /> */}
              </>
            )}
          </Container>
        </div>
      </CheckServerCookie>
    </div>
  )
}

export const metadata = {
  title: 'Preguntas desde API',
}

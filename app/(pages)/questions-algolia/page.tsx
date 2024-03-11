import Searchbar from '@/app/(pages)/questions-algolia/components/searchbar'
import { cookies } from 'next/headers'
import CheckServerCookie from '@/app/components/checkCookie/checkServerCookie'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'

export default async function QuestionPage({
  searchParams,
}: {
  searchParams?: {
    page?: string
    query?: string
  }
}) {
  const auth = await getInfoAuthCookie()
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

import Searchbar from '@/app/(pages)/questions-algolia/components/searchbar'
import CheckServerCookie from '@/app/components/checkCookie/checkServerCookie'

export default function QuestionPage({
  searchParams,
}: {
  searchParams?: {
    page?: string
    query?: string
  }
}) {
  return (
    <div>
      <CheckServerCookie>
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

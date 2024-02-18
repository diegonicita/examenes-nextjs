import Searchbar from '@/app/(pages)/questions-algolia/components/searchbar'

export default function QuestionPage() {
  return (
    <div className="flex flex-col items-start px-8 max-w-[60rem] mx-auto mt-8">
      <div className="mx-auto">
        <Searchbar />
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Preguntas desde API',
}

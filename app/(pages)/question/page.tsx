import Question from '../../components/Question'

export default function QuestionPage() {
  return (
    <div className="flex flex-col items-start px-8 max-w-[60rem] mx-auto mt-8">
      <Question />
    </div>
  )
}

export const metadata = {
  title: 'Preguntas',
}

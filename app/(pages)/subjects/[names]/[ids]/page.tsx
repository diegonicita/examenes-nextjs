import type { ExamType } from '@/app/models/Exam'
import Examen from '@/app/(pages)/questions/components/questions/examen'
import getExamBySubject from '../../actions/getExamBySubject'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'

async function getData() {
  const url = process.env.URL_API
  try {
    const res = await fetch(url + '/api/get-questions-statistics')
    return res.json()
  } catch (error) {
    console.log(error)
    return null
  }
}

export default async function page({
  params,
}: {
  params: { ids: string; names: string }
}) {
  const data = await getData()

  const subject = data?.temas.find(
    (p: ExamType) => p.id === parseInt(params.names),
  )
  const exam = data?.examenes.find(
    (p: ExamType) => p.id === parseInt(params.ids),
  )
  const questions = await getExamBySubject(exam.id, subject.id)
  const payload = await getInfoAuthCookie()

  return (
    <div className="w-full mx-auto max-w-[85ch] px-1">
      <h1 className="text-center mt-2 font-bold text-xl">
        Preguntas de {subject?.titulo}
      </h1>
      <h1 className="text-center font-bold text-xl">
        {exam?.titulo} - {exam?.pais}
      </h1>
      <div className="flex flex-wrap justify-center px-8 max-w-[60rem] mx-auto mt-2 mb-8">
        <h1 className="text-center mt-2 font-bold text-xl"></h1>
        <Examen data={questions} userId={payload?.id} />
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Selecciona un Tipo de Examen',
}

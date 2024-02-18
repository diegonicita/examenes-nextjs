import type { ExamType } from '@/app/models/Exam'
import getExam from '@/app/(pages)/exams/actions/getExam'
import searchValorations from '@/app/(pages)/questions/actions/searchValoration'
import Examen from '@/app/(pages)/questions/components/questions/examen'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'

type YearData = {
  ano: number
  cantidad_preguntas: number
}

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

export default async function ExamIdPage({
  params,
}: {
  params: { ids: string; years: string }
}) {
  const data = await getData()
  const exam = data?.examenes.find(
    (p: ExamType) => p.id === parseInt(params.ids),
  )
  const year = exam?.preguntas.find(
    (y: YearData) => y.ano === parseInt(params.years),
  )
  const payload = await getInfoAuthCookie()
  const questions = await getExam(exam.id, year.ano)

  return (
    <div className="w-full mx-auto max-w-[85ch] px-1">
      <h1 className="text-center mt-2 font-bold text-xl">
        {exam?.titulo} - {exam?.pais}
      </h1>
      <div className="flex flex-wrap justify-center px-8 max-w-[60rem] mx-auto mb-8">
        <h1 className="text-center font-bold text-xl">
          Año {year?.ano} - {year?.cantidad_preguntas} Preguntas
        </h1>
        <Examen data={questions} userId={payload?.id} />
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Practica un Examen',
}

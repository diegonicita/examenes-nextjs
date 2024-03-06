import type { ExamType } from '@/app/models/Exam'
import getExam from '@/app/(pages)/exams/actions/getExam'
import searchValorations from '@/app/(pages)/questions/actions/searchValoration'
import Examen from '@/app/(pages)/questions/components/questions/examen'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import Pagination from '@/app/components/pagination/pagination'
import { Editor } from '@/app/(pages)/questions/components/questions/editor'

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
  searchParams,
}: {
  params: { ids: string; years: string }
  searchParams: { page: number }
}) {
  const data = await getData()
  const exam = data?.examenes.find(
    (p: ExamType) => p.id === parseInt(params.ids),
  )
  const year = exam?.preguntas.find(
    (y: YearData) => y.ano === parseInt(params.years),
  )
  const payload = await getInfoAuthCookie()
  console.log(searchParams.page)
  const questions = await getExam(exam.id, year.ano, 100, searchParams.page)
  const totalQuestion = Math.ceil(year?.cantidad_preguntas / 5)
  return (
    <div className="w-full mx-auto max-w-[85ch] px-1">
      <h1 className="text-center mt-2 font-bold text-xl">
        {exam?.titulo} - {exam?.pais}
      </h1>
      <div className="flex flex-wrap justify-center px-8 max-w-[60rem] mx-auto mb-8">
        <h1 className="text-center font-bold text-xl">
          Año {year?.ano} - {year?.cantidad_preguntas} Preguntas
        </h1>
        {!payload ||
          (payload && payload?.role !== 'admin' && (
            <Examen data={questions} userId={payload?.id} />
          ))}
        {payload && payload.role === 'admin' && (
          <Editor data={questions} userId={payload?.id} temas={data.temas} />
        )}
        <Pagination totalQuestions={totalQuestion} />
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Practica un Examen',
}

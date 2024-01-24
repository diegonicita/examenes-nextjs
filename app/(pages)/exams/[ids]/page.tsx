import Card from './components/card'
import type { ExamType } from '@/app/models/Exam'

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
  params: { ids: string }
}) {
  const data = await getData()
  const exam = data?.examenes.find(
    (p: ExamType) => p.id === parseInt(params.ids),
  )

  return (
    <>
      <h1 className="text-center mt-2 font-bold text-xl">
        {exam?.titulo} - {exam?.pais}
      </h1>
      <div className="flex flex-wrap justify-center px-8 max-w-[60rem] mx-auto mt-2 mb-8">
        {exam &&
          exam.preguntas.map((e: YearData, index: number) => (
            <Card item={exam} key={index} yearData={e} />
          ))}
      </div>
    </>
  )
}

export const metadata = {
  title: 'Examenes y Temas',
}

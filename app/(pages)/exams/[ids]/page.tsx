// import Card from './components/card'
import CardExam from '@/app/components/cards/cardExam'
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
      <h1 className="text-center font-bold text-xl">
        Selecciona el Año del Examen
      </h1>
      <div className="flex flex-wrap justify-center px-8 max-w-[60rem] mt-2 mx-auto mb-8 gap-4">
        {exam &&
          exam.preguntas.map((e: YearData, index: number) => (
            <CardExam
              item={exam}
              key={index}
              year={e.ano}
              link={`/exams/${exam.id}/${e.ano}`}
              total={e.cantidad_preguntas}
            />
          ))}
      </div>
    </>
  )
}

export const metadata = {
  title: 'Selecciona el Año del Examen',
}

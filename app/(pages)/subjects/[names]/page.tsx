import Card from '@/app/(pages)/subjects/[names]/components/card'
import type { ExamType } from '@/app/models/Exam'

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

export default async function page({ params }: { params: { names: string } }) {
  const data = await getData()
  const subject = data?.temas.find(
    (p: ExamType) => p.id === parseInt(params.names),
  )
  return (
    <div>
      <h1 className="text-center mt-2 font-bold text-xl">
        Preguntas de {subject?.titulo}
      </h1>
      <h1 className="text-center mt-2 font-bold text-xl">
        Selecciona un Examen
      </h1>
      <div className="flex flex-wrap justify-center px-8 max-w-[60rem] mx-auto mt-2 mb-8">
        {data &&
          data.examenes.map((p: ExamType, index: number) => (
            <Card item={p} key={index} subjectId={params.names} />
          ))}
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Selecciona un Tipo de Examen',
}

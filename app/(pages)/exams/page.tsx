import Card from '@/app/(pages)/exams/components/card'
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

export default async function ExamPage() {
  const data = await getData()

  return (
    <>      
      <h1 className="text-center mt-2 font-bold text-xl">
        Selecciona un Examen
      </h1>
      <div className="flex flex-wrap justify-center px-8 max-w-[60rem] mx-auto mt-2 mb-8 gap-4">
        {data &&
          data.examenes.map((p: ExamType, index: number) => (
            <Card item={p} key={index} />
          ))}
      </div>
    </>
  )
}

export const metadata = {
  title: 'Selecciona un Tipo de Examen',
}

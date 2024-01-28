import CardSubject from '@/app/components/cards/cardSubject'
import type { SubjectType } from '@/app/models/Subject'

async function getData() {
  const url = process.env.URL_API
  try {
    const res = await fetch(url + '/api/get-questions-statistics', {})
    return res.json()
  } catch (error) {
    console.log(error)

    return null
  }
}

export default async function SubjectPage() {
  const data = await getData()

  return (
    <>
      <h1 className="text-center mt-2 font-bold text-xl">Preguntas por Tema</h1>
      <div className="flex flex-wrap justify-center gap-4 px-8 max-w-[60rem] mx-auto my-2 mb-8">
        {data &&
          data.temas.map((p: SubjectType, index: number) => {
            if (p.visible) return <CardSubject item={p} key={index} />
          })}
      </div>
    </>
  )
}

export const metadata = {
  title: 'Selecciona un Tema o Especialidad',
}

import CardSubject from '@/app/components/cards/cardSubject'
import type { SubjectType } from '@/app/models/Subject'
import getQuestionsStatistics from '@/app/server-actions/questions/get-questions-statistics'

const Page = async () => {
  const data = await getQuestionsStatistics()
  const temas = data.temas as SubjectType[]

  return (
    <>
      <h1 className="text-center mt-2 font-bold text-xl">Preguntas por Tema</h1>
      <div className="flex flex-wrap justify-center gap-4 px-8 max-w-[60rem] mx-auto my-2 mb-8">
        {temas &&
          temas.map((p: SubjectType, index: number) => {
            if (p.visible) return <CardSubject item={p} key={index} />
          })}
      </div>
    </>
  )
}

export default Page

export const metadata = {
  title: 'Selecciona un Tema o Especialidad',
}

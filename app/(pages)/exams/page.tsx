import CardExam from '@/app/components/cards/cardExam'
import type { ExamType } from '@/app/models/Exam'
import { UserType } from '@/app/models/User'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import getQuestionsStatistics from '@/app/server-actions/questions/get-questions-statistics'


const Page = async () => {
  const data = await getQuestionsStatistics()
  const exams = data.examenes as ExamType[]
  const payload = (await getInfoAuthCookie()) as UserType

  return (
    <>
      <h1 className="text-center mt-2 font-bold text-xl">
        Selecciona un Examen
      </h1>
      <div className="flex flex-wrap justify-center px-8 max-w-[60rem] mx-auto mt-2 mb-8 gap-4">
        {exams &&
          exams.map((p: ExamType, index: number) => (
            <CardExam
              item={p}
              key={index}
              year={undefined}
              link={`/exams/${p.id}`}
              total={p.total}
              userId={payload?.id}
            />
          ))}
      </div>
    </>
  )
}

export default Page

export const metadata = {
  title: 'Selecciona un Tipo de Examen',
}

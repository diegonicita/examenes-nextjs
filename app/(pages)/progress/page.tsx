import CardProgress from '@/app/components/cards/cardProgress'
import CardStat from '@/app/components/cards/cardStat'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import type { ExamTypeFromDB } from '@/app/models/Exam'
import type { UserType } from '@/app/models/User'
import Container from '@/app/components/container/container'
import { SubjectType } from '@/app/models/Subject'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
// import getQuestionsStatistics from '@/app/server-actions/questions/get-questions-statistics'

const getData = async () => {
  'use server'
  const result1 = await executeQuery('select * from exams_types', [])
  console.log(result1)
  const result2 = await executeQuery('select * from clasificaciones', [])
  return { examenes: result1, temas: result2 } as {
    examenes: ExamTypeFromDB[]
    temas: SubjectType[]
  }
}

const Page = async () => {
  const data = await getData()
  const exams = data.examenes as ExamTypeFromDB[]
  const payload = (await getInfoAuthCookie()) as UserType

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <Container title="Progreso" subtitle="Respondidas y Correctas">
        <div className="p-2 rounded">
          <CardStat userId={payload?.id} />
        </div>
      </Container>
      <Container title="Resultados" subtitle="Exámenes donde practicaste">
        <div className="flex flex-wrap justify-center px-8 max-w-[60rem] mx-auto mt-4 mb-8 gap-4">
          {exams &&
            exams.map((p, index: number) => (
              <CardProgress
                item={p}
                key={index}
                year={undefined}
                link={`/exams/${p.id}`}
                total={p.total}
                userId={payload?.id}
              />
            ))}
        </div>
      </Container>
      <div className="divider divider-end"></div>
    </div>
  )
}

export const metadata = {
  title: 'Resumen de tus avances',
}

export default Page

import CardProgress from '@/app/components/cards/cardProgress'
import CardStat from '@/app/components/cards/cardStat'
import getQuestionsStatistics from '@/app/server-actions/questions/get-questions-statistics'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import type { ExamType } from '@/app/models/Exam'
import type { UserType } from '@/app/models/User'
import Container from '@/app/components/container/container'

const Page = async () => {
  const data = await getQuestionsStatistics()
  const exams = data.examenes as ExamType[]
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

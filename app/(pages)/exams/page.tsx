import CardExam from '@/app/components/cards/cardExam'
import CardExam2 from '@/app/components/cards/cardExam2'
import Container from '@/app/components/container/container'
import type { ExamType } from '@/app/models/Exam'
import { UserType } from '@/app/models/User'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import getQuestionsStatistics from '@/app/server-actions/questions/get-questions-statistics'

const Page = async () => {
  const data = await getQuestionsStatistics()
  const exams = data.examenes as ExamType[]
  const payload = (await getInfoAuthCookie()) as UserType

  return (
    <div className="mt-8">
      <Container title="Examenes" subtitle="Selecciona un examen">
        <div className="flex flex-wrap justify-center px-8 max-w-[70rem] mx-auto mb-8 gap-4 mt-8">
          {exams &&
            exams.map((p: ExamType, index: number) => (
              <CardExam2
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
      <Container title="Examenes" subtitle="Selecciona un examen">
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
      </Container>
    </div>
  )
}

export default Page

export const metadata = {
  title: 'Selecciona un Tipo de Examen',
}

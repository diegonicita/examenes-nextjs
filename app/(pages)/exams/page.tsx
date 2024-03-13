import CardExam from '@/app/components/cards/cardExam'
import CardExam2 from '@/app/components/cards/cardExam2'
import CardSubject2 from '@/app/components/cards/cardSubject2'
import Container from '@/app/components/container/container'
import type { ExamType } from '@/app/models/Exam'
import { SubjectType } from '@/app/models/Subject'
import { UserType } from '@/app/models/User'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import getQuestionsStatistics from '@/app/server-actions/questions/get-questions-statistics'

const Page = async () => {
  const data = await getQuestionsStatistics()
  const exams = data.examenes as ExamType[]
  const payload = (await getInfoAuthCookie()) as UserType
  const temas = data.temas as SubjectType[]

  return (
    <div className="mt-8">
      <Container title="Exámenes" subtitle="Selecciona un Examen">
        <div className="flex flex-wrap justify-center px-8 max-w-[75rem] mx-auto mb-8 gap-4 mt-8">
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
      <Container title="Temas" subtitle="Selecciona un tema">
        <div className="flex flex-wrap justify-center gap-4 px-8 max-w-[75rem] mx-auto my-2 mb-8">
          {temas &&
            temas.map((p: SubjectType, index: number) => {
              if (p.visible) return <CardSubject2 item={p} key={index} />
            })}
        </div>
      </Container>
    </div>
  )
}

export default Page

export const metadata = {
  title: 'Selecciona un Tipo de Examen',
}

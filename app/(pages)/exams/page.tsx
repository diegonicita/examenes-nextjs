import CardExam from '@/app/components/cards/cardExam'
import CardExam2 from '@/app/components/cards/cardExam2'
import CardSubject2 from '@/app/components/cards/cardSubject2'
import Container from '@/app/components/container/container'
import type { ExamTypeFromDB, ExamTypeFromApi } from '@/app/models/Exam'
import { SubjectType } from '@/app/models/Subject'
import { UserType } from '@/app/models/User'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import executeQuery from '@/app/server-actions/helpers/mysqldb'

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
  const exams = data.examenes
  const payload = (await getInfoAuthCookie()) as UserType
  const temas = data.temas as SubjectType[]

  return (
    <div className="mt-8">
      <Container title="Exámenes" subtitle="Selecciona un Examen">
        <div className="flex flex-wrap justify-center px-8 max-w-[75rem] mx-auto mb-8 gap-4 mt-4">
          {exams &&
            exams.map((p: ExamTypeFromDB, index: number) => (
              <CardExam2
                item={
                  {
                    id: p.id,
                    titulo: p.name,
                    visible: true,
                    imagen: p.image,
                  } as ExamTypeFromApi
                }
                key={index}
                year={undefined}
                link={`/exams/${p.id}`}
                total={p.questions}
                userId={payload?.id}
              />
            ))}
        </div>
      </Container>
      <Container title="Temas" subtitle="Selecciona un tema">
        <div className="flex flex-wrap justify-center gap-4 px-8 max-w-[75rem] mx-auto mt-4 mb-8">
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

import CardExam from '@/app/components/cards/cardExam'
import CardSubject from '@/app/components/cards/cardSubject'
import Container from '@/app/components/container/container'
import type { ExamTypeFromDB, ExamTypeFromApi } from '@/app/models/Exam'
import type { SubjectType } from '@/app/models/Subject'
import type { UserType } from '@/app/models/User'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import getExamsTypes from '@/app/(pages)/exams/actions/getExamsTypes'
import getClasificacion from '@/app/(pages)/exams/actions/getClasificacion'

const getData = async () => {
  'use server'
  const examsTypes = await getExamsTypes()
  const clasificacion = await getClasificacion()
  // await new Promise((res) => setTimeout(res, 2000))
  return { examenes: examsTypes, temas: clasificacion } as {
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
          {exams?.map((p: ExamTypeFromDB, index: number) => (
            <CardExam
              item={
                {
                  id: p.id,
                  titulo: p.name,
                  visible: true,
                  imagen: p.image,
                  pais: p.country
                } as ExamTypeFromApi
              }
              key={p.id}
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
          {temas?.map((p: SubjectType, index: number) => {
              if (p.visible) return <CardSubject item={p} key={p.id} />
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

import CardExam from '@/app/components/cards/cardExam'
import Container from '@/app/components/container/container'
import type { ExamTypeFromApi, ExamTypeFromDB } from '@/app/models/Exam'
import type { SubjectType } from '@/app/models/Subject'
import type { UserType } from '@/app/models/User'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import executeQuery from '@/app/server-actions/helpers/mysqldb'

async function getData() {
  const url = process.env.URL_API
  try {
    const res = await fetch(`${url}/api/get-questions-statistics`)
    return res.json()
  } catch (error) {
    console.log(error)

    return null
  }
}

const getData2 = async () => {
  'use server'
  const result1 = await executeQuery(
    'SELECT exams.id as exam_id, exams.year as exams_year, exams.questions as exams_questions,' +
           'exams_types.* FROM exams JOIN exams_types ON exams.exam_type_id = exams_types.id WHERE exams.exam_type_id = 1',
    [],
  )
  const result2 = await executeQuery('select * from clasificaciones', [])
  // await new Promise((res) => setTimeout(res, 2000))
  return { examenes: result1, temas: result2 } as {
    examenes: ExamTypeFromDB[]
    temas: SubjectType[]
  }
}

export default async function page({ params }: { params: { names: string } }) {
  const data = await getData()
  const data2 = await getData2()
  console.log(data2)
  const subject = data?.temas.find(
    (p: ExamTypeFromApi) => p.id === Number.parseInt(params.names),
  )
  const payload = (await getInfoAuthCookie()) as UserType
  return (
    <div className="mt-8">
      <Container
        title={`Preguntas de ${subject?.titulo}`}
        subtitle="Selecciona un examen"
      >
        <div className="flex flex-wrap justify-center px-8 max-w-[60rem] mx-auto mt-4 mb-8 gap-4">
          {data?.examenes.map((p: ExamTypeFromApi, index: number) => (
              <CardExam
                item={p}
                key={p.id}
                year={undefined}
                link={`/subjects/${params.names}/${p.id}`}
                total={p.total}
                userId={payload?.id}
              />
            ))}
        </div>
      </Container>
    </div>
  )
}

export const metadata = {
  title: 'Selecciona un Tipo de Examen',
}

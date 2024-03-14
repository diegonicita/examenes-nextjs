import CardExam2 from '@/app/components/cards/cardExam2'
import Container from '@/app/components/container/container'
import type { ExamType } from '@/app/models/Exam'
import { UserType } from '@/app/models/User'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'

async function getData() {
  const url = process.env.URL_API
  try {
    const res = await fetch(url + '/api/get-questions-statistics')
    return res.json()
  } catch (error) {
    console.log(error)

    return null
  }
}

export default async function page({ params }: { params: { names: string } }) {
  const data = await getData()
  const subject = data?.temas.find(
    (p: ExamType) => p.id === parseInt(params.names),
  )
  const payload = (await getInfoAuthCookie()) as UserType
  return (
    <div className="mt-8">
      <Container
        title={'Preguntas de ' + subject?.titulo}
        subtitle="Selecciona un examen"
      >
        <div className="flex flex-wrap justify-center px-8 max-w-[60rem] mx-auto mt-4 mb-8 gap-4">
          {data &&
            data.examenes.map((p: ExamType, index: number) => (
              <CardExam2
                item={p}
                key={index}
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

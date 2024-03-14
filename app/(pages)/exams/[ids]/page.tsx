// import Card from './components/card'
import CardExam2 from '@/app/components/cards/cardExam2'
import Container from '@/app/components/container/container'
import type { ExamType } from '@/app/models/Exam'
import { UserType } from '@/app/models/User'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'

type YearData = {
  ano: number
  cantidad_preguntas: number
}

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

export default async function ExamIdPage({
  params,
}: {
  params: { ids: string }
}) {
  const data = await getData()
  const exam = data?.examenes.find(
    (p: ExamType) => p.id === parseInt(params.ids),
  )
  const payload = (await getInfoAuthCookie()) as UserType

  return (
    <div className="mt-8">
      <Container title="Exámenes" subtitle="Selecciona el año">
        <div className="flex flex-wrap justify-center px-8 max-w-[75rem] mx-auto mb-8 gap-4 mt-8">
          {exam &&
            exam.preguntas.map((e: YearData, index: number) => (
              <CardExam2
                item={exam}
                key={index}
                year={e.ano}
                link={`/exams/${exam.id}/${e.ano}`}
                total={e.cantidad_preguntas}
                userId={payload?.id}
              />
            ))}
        </div>
      </Container>
    </div>
  )
}

export const metadata = {
  title: 'Selecciona el Año del Examen',
}

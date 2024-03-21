// import Card from './components/card'
import CardExam from '@/app/components/cards/cardExam'
import Container from '@/app/components/container/container'
import type { ExamTypeFromApi } from '@/app/models/Exam'
import type { UserType } from '@/app/models/User'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'

type YearData = {
  ano: number
  cantidad_preguntas: number
}

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

export default async function ExamIdPage({
  params,
}: {
  params: { ids: string }
}) {
  const data = await getData()
  const exam = data?.examenes.find(
    (p: ExamTypeFromApi) => p.id === Number.parseInt(params.ids),
  )
  const payload = (await getInfoAuthCookie()) as UserType

  return (
    <div className="mt-8">
      <Container title="Exámenes" subtitle="Selecciona el año">
        <div className="flex flex-wrap justify-center px-8 max-w-[75rem] mx-auto mb-8 gap-4 mt-4">
          {exam?.preguntas.map((e: YearData, index: number) => (
            <CardExam
              item={exam}
              key={e.ano}
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

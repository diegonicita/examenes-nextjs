// import Card from './components/card'
import CardExam from '@/app/components/cards/cardExam'
import Container from '@/app/components/container/container'
import type { ExamListItemType, ExamTypeFromDB } from '@/app/models/Exam'
import type { UserType } from '@/app/models/User'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import getExamsList from '../actions/getExamList'
import getExamsTypes from '../actions/getExamsTypes'

type YearData = {
  ano: number
  cantidad_preguntas: number
}

const getData = async (id: string) => {
  'use server'
  const examsTypes = await getExamsTypes()
  const examsList = await getExamsList(id)
  return { examsTypes: examsTypes, exams: examsList } as {
    examsTypes: ExamTypeFromDB[]
    exams: ExamListItemType[]
  }
}

export default async function ExamIdPage({
  params,
}: {
  params: { ids: string }
}) {
  const data = await getData(params.ids)
  const id = Number(params.ids)
  const exam = {
    descripcion: '',
    visible: true,
    name: data.examsTypes[id].name,
    questions: data.examsTypes[id].questions,
    id: data.examsTypes[id].id,
    titulo: data.examsTypes[id].name,
    imagen: data.examsTypes[id].image,
    pais: data.examsTypes[id].country,
    preguntas: data.exams.map((item) => {
      return { ano: Number(item.year), cantidad_preguntas: item.questions }
    }),
    total: data.examsTypes[Number(id)].questions,
  }
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

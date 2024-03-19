import type { ExamTypeFromApi } from '@/app/models/Exam'
import Examen from '@/app/(pages)/questions/components/questions/examen'
import getExamBySubject from '../../actions/getExamBySubject'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import Container from '@/app/components/container/container'

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

export default async function page({
  params,
}: {
  params: { ids: string; names: string }
}) {
  const data = await getData()

  const subject = data?.temas.find(
    (p: ExamTypeFromApi) => p.id === parseInt(params.names),
  )
  const exam = data?.examenes.find(
    (p: ExamTypeFromApi) => p.id === parseInt(params.ids),
  )
  const questions = await getExamBySubject(exam.id, subject.id)
  const payload = await getInfoAuthCookie()

  return (
    <div className="w-full mx-auto max-w-[85ch] px-1 mt-8">
      <Container
        title={'Preguntas de ' + subject?.titulo}
        subtitle={exam?.titulo + ' - ' + exam?.pais}
      >
        <div className="flex flex-wrap justify-center px-8 max-w-[60rem] mx-auto mt-2 mb-8">
          <h1 className="text-center mt-2 font-bold text-xl"></h1>
          <Examen data={questions} userId={payload?.id} />
        </div>
      </Container>
    </div>
  )
}

export const metadata = {
  title: 'Selecciona un Tipo de Examen',
}

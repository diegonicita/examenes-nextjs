import type { ExamTypeFromApi } from '@/app/models/Exam'
import Examen from '@/app/(pages)/questions/components/questions/examen'
import getExamBySubject from '../../actions/getExamBySubject'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import Container from '@/app/components/container/container'
import MessageNotLogged from '@/app/components/checkCookie/messageNotLogged'
import searchComments from '@/app/(pages)/questions/actions/searchComments'

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

export default async function page({
  params,
}: {
  params: { ids: string; names: string }
}) {
  const data = await getData()

  const subject = data?.temas.find(
    (p: ExamTypeFromApi) => p.id === Number.parseInt(params.names),
  )
  const exam = data?.examenes.find(
    (p: ExamTypeFromApi) => p.id === Number.parseInt(params.ids),
  )
  const questions = await getExamBySubject(exam.id, subject.id)
  const payload = await getInfoAuthCookie()
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let treeComments = {} as any

  if (payload) {
    const result = await searchComments(questions)
    treeComments = {
      ...(result?.tree ? result.tree : null),
    }
  }

  return (
    <div className="w-full mx-auto max-w-[85ch] px-1 mt-8">
      <Container
        title={`Preguntas de ${subject?.titulo}`}
        subtitle={`${exam?.titulo} - ${exam?.pais}`}
      >
        <div className="flex flex-wrap justify-center px-8 max-w-[60rem] mx-auto mt-2 mb-8">
          {payload && (
            <Examen
              data={questions}
              userId={payload?.id}
              temas={data.temas}
              currentUser={payload}
              treeComments={treeComments}
            />
          )}
          {!payload && <MessageNotLogged />}
        </div>
      </Container>
    </div>
  )
}

export const metadata = {
  title: 'Selecciona un Tipo de Examen',
}

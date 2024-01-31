import Stat1 from './components/stat1'
import Card from './components/card'
import type { ExamType } from '@/app/models/Exam'
import getQuestionsStatistics from '@/app/server-actions/questions/get-questions-statistics'

const Page = async () => {
  const data = await getQuestionsStatistics()
  const exams = data.examenes as ExamType[]

  return (
    <div className="flex flex-col items-center mt-4 justify-center">
      <h1> Tu Progreso</h1>
      <div className="divider divider-start"></div>
      <div className="p-2 rounded">
        <Stat1 />
      </div>
      <div className="divider"></div>
      <h1> Tus Exámenes</h1>
      <div className="flex flex-wrap justify-center px-8 max-w-[60rem] mx-auto mt-2 mb-8 gap-4">
        {exams &&
          exams.map((p, index: number) => (
            <Card
              item={p}
              key={index}
              year={undefined}
              link={`/exams/${p.id}`}
              total={p.total}
            />
          ))}
      </div>
      <div className="divider divider-end"></div>
    </div>
  )
}

export const metadata = {
  title: 'Resumen de tus avances',
}

export default Page

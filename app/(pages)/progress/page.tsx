import Stat1 from './components/stat1'
import Card from './components/card'
import type { ExamType } from '@/app/models/Exam'

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

const Page = async () => {
  const data = await getData()

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
        {data &&
          data.examenes.map((p: ExamType, index: number) => (
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

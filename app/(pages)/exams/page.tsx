import { unstable_noStore as noStore } from 'next/cache'
import Card from './components/card'
import type { ExamType } from '@/app/models/Exam'

async function getData() {
  noStore()
  const url = process.env.URL_API
  try {
    const res = await fetch(url + '/api/get-questions-statistics', {
      cache: 'no-store',
    })
    return res.json()
  } catch (error) {
    console.log(error)

    return null
  }
}

export default async function ClasificacionesPage() {
  const data = await getData()

  return (
    <div className="flex flex-wrap justify-center px-8 max-w-[60rem] mx-auto mt-8">
      {data &&
        data.examenes.map((p: ExamType, index: number) => (
          <Card item={p} key={index} />
        ))}     
    </div>
  )
}

export const metadata = {
  title: 'Examenes y Temas',
}

'use client'

import { useGetQuestionByIdQuery } from '@/app/lib/services/choice'

export default function QuestionPage() {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetQuestionByIdQuery(5)
  return (
    <>
      <h1 className="font-bold mb-4">
        Pregunta Id: <span>{!isLoading && data?.id}</span>
      </h1>
      {!isLoading && (
        <>
          <div className="">{data?.texto}</div>
          <div className="mt-4">
            {'1)'} {data?.opcion1}
          </div>
          <div className="">
            {'2)'} {data?.opcion2}
          </div>
          <div className="">
            {'3)'} {data?.opcion3}
          </div>
          <div className="">
            {'4)'} {data?.opcion4}
          </div>
        </>
      )}
    </>
  )
}

'use client'

import { useSelector, selectMessage, selectCount } from '@/lib/redux'
import { useGetQuestionByIdQuery } from '@/lib/services/choice'

export default function Verify() {
  const message = useSelector(selectMessage)
  const count = useSelector(selectCount)
  const { data, error, isLoading } = useGetQuestionByIdQuery(6)

  return (
    <>
      <div className="bg-base-200 text-primary-base max-w-[60rem] mx-auto mt-8 p-4 pb-8">
        <h1 className="font-semibold text-xl">Slice Message:</h1>
        <p className="text-4xl mx-auto text-center">{message}</p>
        <h1 className="font-semibold text-xl mt-2">Slice Counter:</h1>
        <p className="text-4xl mx-auto text-center">{count}</p>
      </div>
      {!isLoading && (
        <div className="bg-base-200 text-primary-base max-w-[60rem] mx-auto mt-8 p-4 pb-8">
          <h1 className="font-semibold text-xl">RTQ question:</h1>
          <div className="">data.text = {data?.texto}</div>
        </div>
      )}
    </>
  )
}

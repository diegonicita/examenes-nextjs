'use client'

import { useSelector, selectMessage, selectCount } from '@/app/lib/redux'
import { selectUser, selectToken, selectEmail  } from '@/app/lib/redux'
import { useGetQuestionByIdQuery } from '@/app/lib/services/choice'

export default function Verify() {
  const message = useSelector(selectMessage)
  const count = useSelector(selectCount)
  const username = useSelector(selectUser)
  const token = useSelector(selectToken)
  const email = useSelector(selectEmail)
  const { data, error, isLoading } = useGetQuestionByIdQuery(6)

  return (
    <>
      <div className="bg-base-200 text-primary-base max-w-[60rem] mx-auto mt-8 p-4 pb-8">
        <h1 className="font-semibold text-xl">Slice Message:</h1>
        <p className="text-4xl mx-auto text-center">{message}</p>
        <h1 className="font-semibold text-xl mt-2">Slice Counter:</h1>
        <p className="text-4xl mx-auto text-center">{count}</p>
        <h1 className="font-semibold text-xl mt-2">Slice User:</h1>
        <p className="text-sm mx-auto text-center">token: {token}</p>
        <p className="text-sm mx-auto text-center">username: {username}</p>
        <p className="text-sm mx-auto text-center">email: {email}</p>
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

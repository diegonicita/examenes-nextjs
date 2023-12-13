'use client'

import { useSelector, selectMessage, selectCount } from '@/app/lib/redux'
import { selectUser, selectEmail } from '@/app/lib/redux'
import { useGetQuestionByIdQuery } from '@/app/lib/services/choice'

export default function Verify() {
  const message = useSelector(selectMessage)
  const count = useSelector(selectCount)
  const username = useSelector(selectUser)  
  const email = useSelector(selectEmail)
  const { data, error, isLoading } = useGetQuestionByIdQuery(6)

  return (
    <>
      <div className="bg-base-200 text-primary-base max-w-[60rem] mx-auto mt-8 p-4 pb-8">
        <h1 className="font-bold mb-4"> Slices: </h1>
        <p>Slice Message: {message}</p>
        <p>Slice Counter: {count}</p>
        <p>Slice User (perfil):</p>
        <div>
          <p>
            <span className="font-bold">username: </span>
            {username}
          </p>
          <p>
            <span className="font-bold">email: </span>
            {email}
          </p>
          <span className="font-bold">token: </span>          
        </div>
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

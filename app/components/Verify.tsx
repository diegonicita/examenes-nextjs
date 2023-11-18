'use client'

import { useSelector, selectMessage, selectCount } from '@/lib/redux'

export default function Verify() {
  const message = useSelector(selectMessage)
  const count = useSelector(selectCount)

  return (
    <div className="h-[13rem]">
      <h1 className="font-semibold text-xl">Slice Message:</h1>
      <p>Message: {message}</p>
      <h1 className="font-semibold text-xl mt-2">Slice Counter:</h1>
      <p>Count: {count}</p>
    </div>
  )
}

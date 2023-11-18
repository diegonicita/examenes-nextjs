'use client'

import { useSelector, selectMessage, selectCount } from '@/lib/redux'

export default function Verify() {
  const message = useSelector(selectMessage)
  const count = useSelector(selectCount)

  return (
    <div className="h-[13rem]">
      <h1 className="font-semibold text-xl">Slice:</h1>
      <p>Message Slice: {message}</p>
      <p>Count Slice: {count}</p>
    </div>
  )
}

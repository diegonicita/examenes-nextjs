'use client'

import {
  useSelector,
  useDispatch,
  selectMessage,
  selectCount,
} from '@/lib/redux'

export default function VerifyPage() {
  const message = useSelector(selectMessage)
  const count = useSelector(selectCount)
  const pokemon = useSelector((state) => state.pokemon)

  return (
    <div className="h-[13rem]">
      <h1 className="font-semibold text-xl">Slice:</h1>
      <p>Message Slice: {message}</p>
      <p>Count Slice: {count}</p>
    </div>
  )
}

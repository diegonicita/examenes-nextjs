'use client'

import {
  messageSlice,
  useSelector,
  useDispatch,
  selectMessage,
} from '@/lib/redux'

export default function VerifyPage() {
  const dispatch = useDispatch()
  const message = useSelector(selectMessage)

  return (
    <>
      <h1>Message page</h1>
      <p>
        {message}
      </p>      
    </>
  )
}

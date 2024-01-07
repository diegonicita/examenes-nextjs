'use client'

/* Core */
import { useState } from 'react'

/* Instruments */
import {
  useSelector,
  useDispatch,
  messageSlice,
  selectMessage,
} from '@/app/lib/redux'

export default function Message() {
  const dispatch = useDispatch()
  const message = useSelector(selectMessage)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(messageSlice.actions.setMessage(e.target.value))
  }

  return (
    <>
      <div className="flex gap-2 mt-8">
        <div className="text-primary-base bg-yellow-50">Message Slice:</div>
        <div className="bg-yellow-200 text-center m-auto">{' ' + message}</div>
      </div>
      <div className="flex gap-2 mt-8 flex-col">
        <div className="text-primary-base bg-yellow-50">Message Slice:</div>
        <input
          className="text-center input input-bordered w-full h-auto"
          aria-label="Set increment amount"
          value={message}
          onChange={handleChange}
        />
      </div>
    </>
  )
}

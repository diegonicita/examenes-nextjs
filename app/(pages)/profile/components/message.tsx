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
    <div className="flex gap-2 flex-col mt-8">
      <label htmlFor="message" className="text-primary-base">
        Nuevo valor para Message:
      </label>
      <input
        className="input input-bordered w-full h-auto"
        aria-label="Set increment amount"
        value={message}
        onChange={handleChange}
        id="message"
      />
    </div>
  )
}

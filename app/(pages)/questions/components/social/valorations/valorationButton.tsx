'use client'
import React, { useRef, useState } from 'react'
import { ReactionBarSelector, ReactionCounter } from '@charkour/react-reactions'
import Tooltip from './tooltip'

//@ts-ignore
import { useFormStatus, useFormState, useOptimistic } from 'react-dom'
import { createValoration } from '../../../actions/createValoration'
const initialState = {
  message: 'testing',
}
export interface ReactionCounterObject {
  node: JSX.Element
  label: string
  by: string
}

export default function ValorationButton({
  id_question,
}: {
  id_question: number
}) {
  const [valueEmoji, setValueEmoji] = useState<string | null>(null)
  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(createValoration, initialState)
  const keyRef = useRef<string | null>(null)

  const reactions = [
    { label: 'excelente', node: '❤️', key: 'love' },
    { label: 'buena', node: '👍', key: 'like' },
    { label: 'mala', node: '👎', key: 'unlike' },
  ]

  const ReactBar = () => {
    return (
      <>
        {!valueEmoji && (
          <ReactionBarSelector
            iconSize={25}
            reactions={reactions}
            onSelect={handleReaction}
            style={{
              zIndex: 10,
              marginBottom: '1.2rem',
              position: 'absolute',
              bottom: 0,
              width: '11rem',
              justifyContent: 'center',
            }}
          />
        )}
      </>
    )
  }

  const submitFormData = () => {
    var formData = new FormData()
    formData.append('id', id_question.toString())
    formData.append('like', keyRef.current === 'like' ? 'true' : 'false')
    formData.append('unlike', keyRef.current === 'unlike' ? 'true' : 'false')
    formData.append('love', keyRef.current === 'love' ? 'true' : 'false')
    formAction(formData)
  }

  const handleReaction = (key: string) => {
    setValueEmoji(key)
    keyRef.current = key
    submitFormData()
  }
  const handleValueEmoji = () => {
    setValueEmoji(null)
    keyRef.current = null
    submitFormData()
  }

  return (
    <>
      <div className="flex gap-4 ">
        <Tooltip key={valueEmoji} content={<ReactBar />}>
          {!valueEmoji ? (
            <form action={formAction}>
              <button
                type="submit"
                className="p-2 w-44 cursor-pointer transition duration-300 group-hover:bg-gray-200 bg-base-300"
              >
                ¿ Que opinas ?
              </button>
            </form>
          ) : (
            <>
              <div
                className="w-full cursor-pointer flex gap-4 hover:cursor-pointer"
                onClick={handleValueEmoji}
              >
                <div className="bg-base-200 p-2 w-44 text-center hover:bg-base-300">
                  {valueEmoji === 'like' ? '👍 Me gusta' : ''}
                  {valueEmoji === 'unlike' ? '👎 No me gusta' : ''}
                  {valueEmoji === 'love' ? '❤️ Me Encanta' : ''}
                </div>
              </div>
            </>
          )}
        </Tooltip>
      </div>
    </>
  )
}

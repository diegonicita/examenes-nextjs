'use client'
import React, { useRef, useState } from 'react'
import { ReactionBarSelector, ReactionCounter } from '@charkour/react-reactions'
import Tooltip from './tooltip'
//@ts-ignore
import { useFormStatus, useFormState } from 'react-dom'
import { createValoration } from '../../actions/createValoration'
const initialState = {
  message: 'testing',
}
export interface ReactionCounterObject {
  node: JSX.Element
  label: string
  by: string
}

export default function Reactions({ id_question }: { id_question: string }) {
  const [reset, setReset] = useState<string | null>(null)
  const [valueEmoji, setValueEmoji] = useState<string | null>(null)
  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(createValoration, initialState)
  const keyRef = useRef<string | null>(null)

  const reactions = [
    { label: 'excelente', node: '❤️', key: 'love' },
    { label: 'buena', node: '👍', key: 'like' },
    { label: 'mala', node: '👎', key: 'unlike' },
  ]
  const reactionsCounter: ReactionCounterObject[] = [
    { node: <div>👍</div>, by: 'excelente', label: 'excelente' },    
  ]

  const reactionsCounter2: ReactionCounterObject[] = [
    { node: <div>👎</div>, by: 'excelente', label: 'excelente' },    
  ]

  const reactionsCounter3: ReactionCounterObject[] = [
    { node: <div>❤️</div>, by: 'excelente', label: 'excelente' },    
  ]
  const handleReaction = (key: string) => {
    setValueEmoji(key)
    keyRef.current = key
    console.log('Reaction', keyRef)
    var formData = new FormData()
    formData.append('id', id_question)
    formData.append('like', keyRef.current === 'like' ? 'true' : 'false')
    formData.append('unlike', keyRef.current === 'unlike' ? 'true' : 'false')
    formData.append('love', keyRef.current === 'love' ? 'true' : 'false')
    formAction(formData)
    console.log(key)
  }
  const handleValueEmoji = () => {
    setValueEmoji(null)
    keyRef.current = null
    var formData = new FormData()
    formData.append('id', id_question)
    formData.append('like', 'false')
    formData.append('unlike', 'false')
    formData.append('love', 'false')
    formAction(formData)
    
  }

  return (
    <>
      <div className="flex mb-2 pb-2 gap-2 -z-10">
        <ReactionCounter
          showTotalOnly
          showOthersAlways
          reactions={reactionsCounter}
        />
        <ReactionCounter
          showTotalOnly
          showOthersAlways
          reactions={reactionsCounter3}
        />
        <ReactionCounter
          showTotalOnly
          showOthersAlways
          reactions={reactionsCounter2}
        />
      </div>
      <div className="flex gap-4">
      <Tooltip
        content={
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
        }
      >
        {!valueEmoji ? (
          <form action={formAction}>
            <button
              type="submit"
              className="p-2 w-44 cursor-pointer transition duration-300 group-hover:bg-gray-200 bg-base-300"
            >
              ¿ Quieres Opinas ?
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
      <form action={formAction}>
        <button
          type="submit"
          className="p-2 w-44 cursor-pointer transition duration-300 bg-base-200 hover:bg-base-300"
        >
          Comentarios
        </button>
      </form>
      </div>
    </>
  )
}

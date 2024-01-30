'use client'
import React, { useEffect, useState } from 'react'
import useEmoji from '@/app/hooks/questions/comments/useEmoji'
import createReply from '../../../actions/createComment'
//@ts-ignore
import { useFormStatus, useFormState } from 'react-dom'

const initialState = {
  message: '',
}
const FirstInputComment = ({
  questionId,
  parentId,
  depth = 0,
}: {
  questionId: number
  parentId: number | null
  depth: number
}) => {
  const {
    saveTextAndEmoji,
    handleInputComment,
    handleOpenEmoji,
    handleStopPropagation,
    openEmoji,
    handleCloseEmoji,
    handleSaveEmoji,
  } = useEmoji()

  const [state, formAction] = useFormState(createReply, initialState)
  const [reset, setReset] = useState('')

  useEffect(() => {
    if (state?.message === 'success') {
      setReset(Math.random().toString())
    }
  }, [state])

  return (
    <>
      <form key={reset} action={formAction}>
        <input
          id="id_parent_comment"
          type="hidden"
          name="id_parent_comment"
          value={'nula'}
        />
        <input
          id="id_question"
          type="hidden"
          name="id_question"
          value={questionId.toString()}
        />
        <input
          type="text"
          placeholder="add a comment to null parent"
          className="focus:outline-none w-full "
          name="comment"
          id="comment"
        />
        <button  className="btn btn-sm btn-error" type="submit">reply</button>
      </form>
    </>
  )
}

export default FirstInputComment

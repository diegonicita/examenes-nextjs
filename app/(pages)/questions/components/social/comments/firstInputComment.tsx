'use client'
import React, { useEffect, useState } from 'react'
import useEmoji from '@/app/hooks/questions/comments/useEmoji'
import createReply from '../../../actions/createComment'
//@ts-ignore
import { useFormState } from 'react-dom'
import MainCommentInput from './mainCommentInput'


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
    
    resetSaveTextAndEmojiNoId
  } = useEmoji()

  const [state, formAction] = useFormState(createReply, initialState)
  const [reset, setReset] = useState('')

  useEffect(() => {
    if (state?.message === 'success') {
      setReset(Math.random().toString())
      resetSaveTextAndEmojiNoId()
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
        <MainCommentInput />
      </form>
    </>
  )
}

export default FirstInputComment

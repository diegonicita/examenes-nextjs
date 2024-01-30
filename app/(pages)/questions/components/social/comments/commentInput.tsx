'use client'
//@ts-ignore
import React from 'react'
import { IconEmojiSmile } from '../valorations/icons'
//@ts-ignore
import useEmoji from '@/app/hooks/questions/comments/useEmoji'
import EmojiPicker from 'emoji-picker-react'
import UserComments from './userComments'
//@ts-ignore
import { useState, useOptimistic, useRef } from 'react'
import { z } from 'zod'
import createComment from '@/app/(pages)/questions/actions/commentPost'

export default function CommentInput({
  messages,
  setMessages,
  id_question,
  id_user,
}: {
  messages?: any
  setMessages?: React.Dispatch<any>
}) {
  const {
    saveTextAndEmoji,
    handleInputComment,
    handleOpenEmoji,
    handleStopPropagation,
    openEmoji,
    handleCloseEmoji,
    handleSaveEmoji,
  } = useEmoji()

  const id_parent = 84
  const [errorClientSide, setErrorClientSide] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const schema = z.object({
    comment: z
      .string({ invalid_type_error: 'el comentario tiene que ser un string' })
      .min(2, { message: 'debe contener al meenos una palabra' })
      .trim(),
  })

  const input = async (formData: FormData) => {
    const newTodo = { comment: formData.get('comment') }
    const result = schema.safeParse(newTodo)
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        setErrorClientSide(issue.path[0] + ': ' + issue.message + '. ')
      })
    } else {
      setErrorClientSide('')
      formRef?.current?.reset()
    }
    addOptimisticMessage({
      id_question: id_question,
      id_user: id_user,
      //@ts-ignore
      comment_text: result.data.comment,
      id_parent_comment: id_parent,
    })

    //@ts-ignore
    console.log(id_question.id_question)
    const response = await createComment({
      comment: result.data.comment,
      id_question: id_question.id_question,
    })
    console.log(response)

    if (response?.message === 'success' && setMessages && messages) {
      setMessages((prevMessages: any) => [
        ...prevMessages,
        {
          id_question: id_question,
          id_user: id_user,
          //@ts-ignore
          comment_text: result.data.comment,
          id_parent_comment: id_parent,
        },
      ])
    }
  }

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state: any, newMessage: any) => {
      return [...state, newMessage]
    },
  )

  return (
    <div className="w-full">
      <form action={input} ref={formRef}>
        <div className="rounded-full border border-gray-300 relative p-2">
          <input
            type="text"
            value={saveTextAndEmoji}
            placeholder="add a comment"
            className="focus:outline-none w-full "
            name="comment"
            onChange={handleInputComment}
          />

          <span
            className="absolute right-5 top-3 cursor-pointer"
            onClick={handleOpenEmoji}
          >
            <IconEmojiSmile />
          </span>
        </div>
        {saveTextAndEmoji && (
          <button className="btn-sm btn mt-2" type="submit">
            post
          </button>
        )}
        <label htmlFor="">{errorClientSide}</label>
      </form>
      <div onClick={handleCloseEmoji}>
        {openEmoji && (
          <div onClick={handleStopPropagation} className="w-[348px]">
            <EmojiPicker searchDisabled onEmojiClick={handleSaveEmoji} />
          </div>
        )}
      </div>
      {optimisticMessages?.map((message: any, index: number) => (
        <div key={index}>
          <UserComments data={message} />
          {!!message.sending && <small>(Sending...)</small>}
          <div> INPUT </div>
        </div>
      ))}
    </div>
  )
}

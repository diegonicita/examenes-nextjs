'use client'
//@ts-ignore
import React from 'react'
import { IconEmojiSmile } from '../valorations/icons'
//@ts-ignore
import useEmoji from '@/app/hooks/questions/comments/useEmoji'
import EmojiPicker from 'emoji-picker-react'
import UserComments from './userComments'
import useCommentInput from '@/app/hooks/questions/comments/commentInput'

export default function CommentInput({
  messages,
  setMessages,
  id_question,
  id_user
}: {
  messages?: any
  setMessages?: React.Dispatch<any>,
  
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
  const {formRef,errorClientSide,optimisticMessages,input} = useCommentInput({messages,setMessages,id_question,id_user})
  
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
        </div>
      ))}
    </div>
  )
}

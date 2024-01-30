'use client'
import React, { useEffect, useState } from 'react'
import useEmoji from '@/app/hooks/questions/comments/useEmoji'
import createReply from '../../../actions/createComment'
//@ts-ignore
import { useFormStatus, useFormState } from 'react-dom'




const initialState = {
  message: '',
}
const RenderTree = ({
  tree,
  parentId,
  depth = 0,
}: {
  tree: any
  parentId: any
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
    if (state.message === 'success') {
      setReset(Math.random().toString())
    }
  }, [state])

  if (tree) {
    return tree.map(
      (t: {
        comment: {
          id: number
          id_parent_comment: number | string
          comment_text: string
          id_question: number
        }
        children: object
      }) =>
        t.comment.id_parent_comment === parentId && (
          <div key={t.comment.id}>
            <div className="" style={{ paddingLeft: `${depth * 20}px` }}>
              <span>ID:{t.comment.id}. </span>
              <span>
                PARENT:
                {t.comment.id_parent_comment
                  ? t.comment.id_parent_comment.toString() + '. '
                  : ' NULO. '}
              </span>
              <span className="bg-green-100">
                MENSAJE: {t.comment.comment_text}{' '}
              </span>
            </div>
            <form key={reset} action={formAction}>
              <input
                id="id_parent_comment"
                type="hidden"
                name="id_parent_comment"
                value={
                  t.comment.id_parent_comment
                    ? t.comment.id_parent_comment.toString()
                    : 'nula'
                }
              />
              <input
                id="id_question"
                type="hidden"
                name="id_question"
                value={t.comment.id_question.toString()}
              />
              <input
                type="text"
                placeholder="add a comment"
                className="focus:outline-none w-full "
                name="comment"
                id="comment"
              />
              <button type="submit">reply</button>
            </form>
            <RenderTree
              tree={t.children}
              parentId={t.comment.id}
              depth={depth + 1}
            />
          </div>
        ),
    )
  }
}

export default RenderTree

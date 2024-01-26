'use client'
import React, { useState } from 'react'
//@ts-ignore
import Comments from './comments'
import { getUserComments } from '../../../actions/commentPost'
import UserComments from './userComments'
import CommentInput from './commentInput'
import { useSearchParams } from 'next/navigation'

export default function CommentContainer() {
  const [openComments, setOpenComments] = useState(false)
  const [data, setData] = useState<Array<any>>([])

  const handleOpenComments = async () => {
    setOpenComments(true)
    const result = await getUserComments()
    console.log(result)
    // setData(result)
  }

  return (
    <>
      <div className="flex gap-4 ">
        <button
          type="button"
          className="p-2 w-44 cursor-pointer transition duration-300 bg-base-200 hover:bg-base-300"
          onClick={handleOpenComments}
        >
          Comentarios
        </button>
      </div>
      {(openComments || (data && data.length > 0)) && (
        <div>
          {/* <Comments key={data} > */}
          {openComments && <CommentInput messages={data} />}
          {/* </Comments> */}
        </div>
      )}
    </>
  )
}

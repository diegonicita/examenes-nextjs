'use client'
import { UseEmoji } from '@/app/hooks/questions/comments/useEmoji'
const RenderTree = dynamic(() => import('../renderTree'))
const FirstInputComment = dynamic(() => import('../firstInputComment'))

import type { UserType } from '@/app/models/User'
import dynamic from 'next/dynamic'
interface allTheCommentContent {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  item: any
  treeComments: string[]
  currentUser: UserType
}
export default function AllTheCommentContent({
  item,
  treeComments,
  currentUser,
}: allTheCommentContent) {
  return (
    <div className='collapse bg-base-200 mt-4'>
      <input type='checkbox' />
      <div className='collapse-title text-xl font-medium'>Comentarios</div>
      <div className='collapse-content pr-5 min-w-[330px] md:max-w-full'>
        <UseEmoji>
          <FirstInputComment questionId={item.id} parentId={null} depth={1} />
        </UseEmoji>
        <RenderTree
          tree={treeComments[item.id]}
          parentId={null}
          depth={1}
          currentUser={currentUser}
        />

        {treeComments[item.id] === undefined && <div> No hay comentarios </div>}
      </div>
    </div>
  )
}

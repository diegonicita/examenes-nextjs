'use client'
import toast from 'react-hot-toast'

export const notify = (text: string) => {
  return toast.custom(
    (t) => (
      <div
        className={`text-white font-bold bg-success px-6 py-4 shadow  ${
          t.visible ? 'animate-enter' : 'animate-leave'
        }`}
      >
        {text}
      </div>
    ),
    {
      position: 'bottom-left',
    },
  )
}

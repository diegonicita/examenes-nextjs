import { toast } from 'react-hot-toast'

export const notifySuccess = (text: string) =>
  toast.custom(
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

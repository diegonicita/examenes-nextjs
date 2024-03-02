import { toast } from 'react-hot-toast'

export const notifyErrors = (text: string) =>
  toast.custom(
    (t) => (
      <div
        className={`text-white font-bold bg-error p-4 shadow  ${
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

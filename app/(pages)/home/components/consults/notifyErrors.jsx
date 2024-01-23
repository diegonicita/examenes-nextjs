import { toast } from 'react-hot-toast'

export const notifyErrors = () =>
  toast.custom(
    (t) => (
      <div
        className={`text-white font-bold bg-error p-4 shadow  ${
          t.visible ? 'animate-enter' : 'animate-leave'
        }`}
      >
        Consulta no enviada. Intenta más tarde.
      </div>
    ),
    {
      position: 'bottom-left',
    },
  )

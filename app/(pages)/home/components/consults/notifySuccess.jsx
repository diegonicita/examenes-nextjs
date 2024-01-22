import { toast } from 'react-hot-toast'

export const notifySuccess = () =>
  toast.custom(
    (t) => (
      <div
        className={`text-white font-bold bg-success px-6 py-4 shadow  ${
          t.visible ? 'animate-enter' : 'animate-leave'
        }`}
      >
        ¡ Consulta Enviada !
      </div>
    ),
    {
      position: 'bottom-left',
    },
  )

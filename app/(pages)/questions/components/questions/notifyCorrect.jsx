import { toast } from 'react-hot-toast'

export const notifyCorrect = (numero) =>
  toast.custom((t) => (
    <div
      className={`text-white font-bold bg-success px-6 py-4 shadow  ${
        t.visible ? 'animate-enter' : 'animate-leave'
      }`}
    >
      Pregunta N° {numero} ¡Respuesta
      Correcta!
    </div>
  ))

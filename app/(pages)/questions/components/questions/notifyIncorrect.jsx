import { toast } from 'react-hot-toast'

export const notifyIncorrect = (numero) =>
  toast.custom((t) => (
    <div
      className={`text-white font-bold bg-error p-4 shadow  ${
        t.visible ? 'animate-enter' : 'animate-leave'
      }`}
    >
       Pregunta N° {numero} ¡Respuesta
      Incorrecta!
    </div>
  ))

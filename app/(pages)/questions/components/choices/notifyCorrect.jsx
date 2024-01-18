import { toast } from 'react-hot-toast'

export const notifyCorrect = (numero) =>
  toast.custom((t) => (
    <div
      className={`text-black font-bold bg-success px-6 py-4 shadow  ${
        t.visible ? 'animate-enter' : 'animate-leave'
      }`}
    >
      <span className={'text-xl'}>✔️</span> Pregunta N° {numero} Respuesta
      Correcta!
    </div>
  ))

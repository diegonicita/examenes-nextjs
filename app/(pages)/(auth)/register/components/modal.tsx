'use client'

type Props = {
  message: string
}

export const Modal = ({ message }: Props) => {
  return (
    <>
      <div className="bg-red-200 p-2 rounded-lg z-10 w-full mx-auto">
        <div className="text-center">
          <span className="loading loading-bars loading-sm"></span>
          <span className="loading loading-bars loading-sm"></span>
          <span className="loading loading-bars loading-sm"></span>
          <span className="loading loading-bars loading-sm"></span>
          <span className="loading loading-bars loading-sm"></span>
          <span className="loading loading-bars loading-sm"></span>
          <div className="font-bold">
            Msg: {message === '' ? 'No hay mensajes' : message}
          </div>
        </div>
      </div>
    </>
  )
}

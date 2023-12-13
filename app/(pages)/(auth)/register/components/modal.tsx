import { Dispatch, SetStateAction } from 'react'

type Props = {
  showModal: boolean
  handleShowModal: Dispatch<SetStateAction<boolean>>
  respObject: any
}

export const Modal = ({ showModal, handleShowModal, respObject }: Props) => {
  return (
    <>
      {showModal && (
        <>
          <div className="bg-gray-900 opacity-50 fixed w-full h-full top-0 right-0 blur-lg z-10"></div>

          <div className="relative text-start bg-white text-sm px-4 pb-4 rounded-xl border border-gray-200 z-20 w-[40rem] max-w-lg">
            <p className="font-bold"> Respuesta del Servidor: </p>
            <div className="mt-2 break-words w-full h-30">
              <div>
                <span className="font-bold">isError: </span>
                {respObject?.isError ? 'True' : 'False'}
              </div>
              <div>
                <span className="font-bold">errors: </span>
                {respObject?.errors &&
                  respObject?.errors.map((e: any, index: number) => (
                    <div key={index} className="pl-2">
                      <div>
                        <span className="font-bold">({index}) campo: </span>
                        {e.path}
                      </div>
                      <div>
                        <span className="pl-2 font-bold">mensaje: </span>{' '}
                        {e.msg}
                      </div>
                      <div>
                        <span className="pl-2 font-bold">valor: </span>
                        {e.value ? e.value : 'vacio'}
                      </div>
                    </div>
                  ))}
              </div>
              <div>
                <span className="font-bold">message: </span>
                {respObject?.message}
              </div>
              <div>
                <span className="font-bold">userResponse: </span>
                {JSON.stringify(respObject?.userResponse)}
              </div>              
            </div>
            <button
              className="absolute btn btn-sm top-1 right-1"
              onClick={() => handleShowModal(false)}
            >
              X
            </button>
          </div>
        </>
      )}
    </>
  )
}

'use client'
import { useRef, RefObject } from 'react'
import SubmitButton from './submit'
import ConsultaLeftColumn from './leftColumn'
import { useForm } from './useForm'
import Modal, { ModalHayErrores, ModalNoHayErrores } from './modal'

export default function Consultas() {
  const formRef = useRef<HTMLFormElement>(null)

  const { formAction, errors, setErrors, ref, status } = useForm(formRef)

  // Función que se ejecutará cuando el input tome el foco
  const handleInputFocus = (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement>,
  ) => {
    const id = event.target.id
    setErrors({ ...errors, [id]: '' })
  }

  return (
    <div className="mx-auto max-w-[55rem] mb-8">
      <div className="flex">
        <ConsultaLeftColumn />
        <Modal
          id="my_modal_success"
          title="Consulta Enviada"
          description="Pronto recibiras una respuesta, gracias!"
        />
        <Modal
          id="my_modal_errors"
          title="Consulta No Enviada"
          description="Hay errores en el formulario"
        />
        <form
          action={formAction}
          name="consultaf"
          className="flex flex-col w-full px-8"
          ref={formRef}
        >
          <h1 className="text-center mt-8 md:mt-0 md:text-left md:text-slate-700 text-xl md:text-3xl pb-4">
            Envianos tu Consulta
          </h1>
          <div className="p-8 flex flex-col bg-base-200 rounded-lg">
            <label
              htmlFor="nombreyapellido"
              className="text-slate-800 text-base font-medium leading-none mb-[2px] pb-2"
            >
              Nombre y Apellido
            </label>
            <input
              type="text"
              placeholder="Ingresa tu nombre y apellido"
              className="h-16 px-4 py-4 bg-base rounded-md border border-base-300"
              name="fullname"
              id="fullname"
              autoComplete="false"
              // disabled={isFormDisabled}
              onFocus={handleInputFocus}
            />
            <div className="h-2 text-error font-bold text-start px-2">
              {errors?.fullname && errors.fullname}
            </div>
            <label
              htmlFor=""
              className="text-slate-800 text-base font-medium 
      font-inter leading-none mb-[2px] mt-7 pb-2"
            >
              Correo electrónico
            </label>
            <input
              type="text"
              placeholder="Ingresa tu correo electronico"
              className="h-16 px-4 py-4 bg-base rounded-md border border-base-300"
              name="email"
              id="email"
              autoComplete="false"
              // disabled={isFormDisabled}
              onFocus={handleInputFocus}
            />
            <div className="h-2 text-error font-bold text-start px-2">
              {errors?.email && errors.email}
            </div>
            <label
              htmlFor=""
              className="text-slate-800 text-base font-medium 
      font-inter leading-none mb-[2px] mt-7 pb-2"
            >
              Mensaje
            </label>
            <textarea
              className="h-36 px-4 py-4 bg-base rounded-md border border-base-300"
              name="consult"
              id="consult"
              autoComplete="false"
              placeholder="Ingresa tu consulta"
              // disabled={isFormDisabled}
              onFocus={handleInputFocus}
            />
            <div className="h-2 text-error font-bold text-start px-2">
              {errors?.consult && errors.consult}
            </div>
            <div className="relative text-center">
              <div className="mx-auto px-4 pt-8">
                <SubmitButton text="Enviar" textOnClick="...Espere..." />
              </div>

              {/* <div className="absolute text-error font-bold text-center top-0 left-0.5 right-0.5">
                {ref.message &&
                  ref.message?.current !== null &&
                  ref.message.current}
              </div> */}
              {status === 'success' && <ModalNoHayErrores />}
              {status === 'error' && <ModalHayErrores />}
              {status === 'idle' && (
                <div className="absolute text-sm bg-base-100 text-base-content px-2">
                  Form en espera
                </div>
              )}

              {/* <div className="h-2 font-bold text-lg">
                {ref.message &&
                  ref.message?.current !== null &&
                  ref.message?.current}
              </div> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

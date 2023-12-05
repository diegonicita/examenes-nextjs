'use client'
//@ts-ignore
import { useFormState } from 'react-dom'
import { insertAction } from '@/app/server-actions/consults/insertAction'
import SubmitButton from './submit'
import { useEffect, useState, useRef } from 'react'
import { type StateType } from '@/app/models/consult.type'

const initialState = {
  fullname: '',
  email: '',
  consult: '',
  message: '',
  clickNumber: 10,
} as StateType

export default function Consultas() {
  const [state, formAction] = useFormState(insertAction, initialState)
  const [counter, setCounter] = useState(0)
  const [message, setMessage] = useState('')
  const [fullname, setFullname] = useState('')
  const [consult, setConsult] = useState('')
  const [disableForm, setDisableForm] = useState(false)
  const fullnameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const consultRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setCounter(state.clickNumber)
    setMessage(state.message)
    setFullname(state.fullname)
    setConsult(state.consult)
  }, [state.clickNumber])

  useEffect(() => {
    setDisableForm(true)
    let timer = setTimeout(() => {
      if (message === 'Tu consulta fue enviada exitosamente!') {
        if (fullnameRef && fullnameRef.current) fullnameRef.current.value = ''
        if (emailRef && emailRef.current) emailRef.current.value = ''
        if (consultRef && consultRef.current) consultRef.current.value = ''
        setMessage('')
        setFullname('')
      }
      setMessage('')
      setDisableForm(false)
    }, 1500)
    return () => {
      clearTimeout(timer)
    }
  }, [counter])

  return (
    <div className="mx-auto max-w-[55rem] mb-8">
      <div className="flex">
        <div className="hidden sm:block sm:w-80 px-4">
          <h1 className="text-left md: text-slate-700 text-xl md:text-3xl pb-4">
            Tenemos un Comprimiso con la Excelencia
          </h1>
          <p>
            Desde RM Residencias Médicas queremos escuchar todo sobre tu
            experiencia visitando nuestro sitio web
          </p>
          <h2 className="text-left md: text-slate-700 text-md md:text-xl py-4">
            ¿Preguntas con errores?
          </h2>
          <p>
            Si alguna respuesta u opcion no te parece correcta envianos un
            mensaje
          </p>
          <h2 className="text-left md: text-slate-700 text-md md:text-xl py-4">
            ¿Categoria incorrecta?
          </h2>
          <p>
            Si alguna pregunta esta mal categorizada estamos para escucharte.
          </p>
          <h2 className="text-left md: text-slate-700 text-md md:text-xl py-4">
            Gracias por tu visita
          </h2>
        </div>
        <form
          action={formAction}
          name="consultaf"
          className="flex flex-col w-full px-8"          
        >
          <h1 className="text-left md: text-slate-700 text-xl md:text-3xl pb-4">
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
              ref={fullnameRef}
              autoComplete="false"
              disabled={disableForm}
            />
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
              ref={emailRef}
              autoComplete="false"
              disabled={disableForm}
            />
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
              ref={consultRef}
              autoComplete="false"
              placeholder='Ingresa tu consulta'
              disabled={disableForm}
            />
            <div className="relative text-center">
              <div className="mx-auto px-4 pt-8">
                <SubmitButton text="Enviar" textOnClick="...Espere..." />
              </div>
              <div className="absolute text-error font-bold text-center top-0 left-0.5 right-0.5">
                {message}
              </div>
            </div>            
          </div>
        </form>
      </div>
    </div>
  )
}

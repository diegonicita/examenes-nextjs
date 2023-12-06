'use client'
//@ts-ignore
import { useFormState } from 'react-dom'
import { insertAction } from '@/app/(pages)/consults-server/actions/insert'
import SubmitButton from './submit'
import { useEffect, useState, useRef } from 'react'
import { type ConsultType } from '@/app/models/Consult'
import ConsultaLeftColumn from './consultaLeftColumn'

const initialState = {
  fullname: '',
  email: '',
  consult: '',
  message: '',
  clickNumber: 10,
} as ConsultType

export default function Consultas() {
  const [state, formAction] = useFormState(insertAction, initialState)
  const [counter, setCounter] = useState(0)
  const [message, setMessage] = useState('')
  const [disableForm, setDisableForm] = useState(false)
  const fullnameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const consultRef = useRef<HTMLTextAreaElement>(null)
  const [errors, setErrors] = useState({
    fullname: 'test error message',
    email: 'test error message',
    consult: 'test error message',
  })

  useEffect(() => {
    setCounter(state.clickNumber)
    setMessage(state.message)
  }, [state.clickNumber])

  useEffect(() => {
    setDisableForm(true)
    let objMessage: { success: any; error: any } | null = null
    if (message && message !== '') {
      try {
        objMessage = JSON.parse(message)
        // Iterar sobre los problemas
        const newObj = { fullname: '', email: '', consult: '' }
        objMessage?.error?.issues.forEach(
          (issue: { path: string | string[]; message: any }) => {
            // Verificar el path y asignar el mensaje al estado correspondiente

            if (issue.path.includes('fullname')) newObj.fullname = issue.message
            if (issue.path.includes('email')) newObj.email = issue.message
            if (issue.path.includes('consult')) newObj.consult = issue.message
          },
        )
        setErrors({ ...errors, ...newObj })
      } catch (error) {
        console.error('Error parsing JSON:', error)
      }
    } else {
      console.log('no errors')
      setErrors({ ...errors, fullname: '', email: '', consult: '' })
    }
    let timer = setTimeout(() => {
      if (objMessage?.success) {
        if (fullnameRef && fullnameRef.current) fullnameRef.current.value = ''
        if (emailRef && emailRef.current) emailRef.current.value = ''
        if (consultRef && consultRef.current) consultRef.current.value = ''
        setMessage('')
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
        <ConsultaLeftColumn />
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
              ref={emailRef}
              autoComplete="false"
              disabled={disableForm}
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
              ref={consultRef}
              autoComplete="false"
              placeholder="Ingresa tu consulta"
              disabled={disableForm}
            />
            <div className="h-2 text-error font-bold text-start px-2">
              {errors?.consult && errors.consult}
            </div>
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

'use client'
import React, { useRef, useState } from 'react'
import { insertAction } from '@/app/(pages)/consults/actions/insert'
import SubmitButton from './submit'
import Input from './input'
import TextArea from './textarea'

export const Form = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    consult: '',
  })
  
  const handleAction = async (formData: FormData) => {
    console.log('formAction')
    // insertAction()
  }
  
  const handleFocus = (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement>,
  ) => {
    const id = event.target.id
    // console.log('handle Input Focus')
    // console.log('input id: ' + id)
    setErrors({ ...errors, [id]: 'focus ' + id })
  }

  const handleBlur = (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement>,
  ) => {
    const id = event.target.id
    // console.log('handle Input Focus')
    // console.log('input id: ' + id)
    setErrors({ ...errors, [id]: 'blur ' + id })
  }

  return (
    <form
      action={handleAction}
      name="consultaf"
      className="flex flex-col w-full px-8"
      ref={formRef}
    >
      <h1 className="text-center mt-8 md:mt-0 md:text-left md:text-slate-700 text-xl md:text-3xl pb-4">
        Envianos tu Consulta
      </h1>
      <div className="p-8 flex flex-col bg-base-200 rounded-lg">
        <Input
          data={{
            type: 'text',
            text: 'Nombre y Apellido',
            placeholder: 'Ingresa tu nombre y apellido',
            id: 'fullname',
            name: 'fullname',
            error: errors.fullname,
          }}
          handleBlur={handleBlur}
          handleFocus={handleFocus}
        />
        <Input
          data={{
            type: 'text',
            text: 'Correo electrónico',
            placeholder: 'Ingresa tu correo electronico',
            id: 'email',
            name: 'email',
            error: errors.email,
          }}
          handleBlur={handleBlur}
          handleFocus={handleFocus}
        />
        <TextArea
          data={{
            text: 'Mensaje',
            placeholder: 'Ingresa tu consulta',
            id: 'consult',
            name: 'consult',
            error: errors.consult,
          }}
          handleBlur={handleBlur}
          handleFocus={handleFocus}
        />
        <div className="relative text-center">
          <div className="mx-auto px-4 pt-8">
            <SubmitButton text="Enviar" textOnClick="...Espere..." />
          </div>
        </div>
      </div>
    </form>
  )
}

export default Form

'use client'
import React, { useRef, useState } from 'react'
import { insertAction } from '@/app/(pages)/consults/actions/insert'
import SubmitButton from './submit'
import Input from './input'
import TextArea from './textarea'
import {
  checkFullValidation,
  checkPartialValidation,
  getErrorsFromResult,
} from './validation'
import { TailwindToaster } from '@/app/(pages)/questions/components/choices/tailwindToaster'
import { notifySuccess } from './notifySuccess'
import { notifyErrors } from './notifyErrors'

export const Form = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    consult: '',
  })

  const handleSubmit = async (formData: FormData) => {
    const result = checkFullValidation(formData)
    const response = getErrorsFromResult(result)
    setErrors({ ...errors, ...response })
    if (result.success) {
      const response = await insertAction(formData)
      if (response?.message === 'success') {
        notifySuccess()
        if (formRef.current) {
          formRef.current.reset()
        }
      } else {
        notifyErrors()
      }
    }
  }

  const handleBlur = (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement>,
  ) => {
    const result = checkPartialValidation(
      new FormData(formRef.current as HTMLFormElement),
      {
        fullname: event.target.id === 'fullname' ? undefined : true,
        email: event.target.id === 'email' ? undefined : true,
        consult: event.target.id === 'consult' ? undefined : true,
      },
    )
    const response = getErrorsFromResult(result)
    setErrors({ ...errors, ...response })
  }

  return (
    <form
      action={handleSubmit}
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

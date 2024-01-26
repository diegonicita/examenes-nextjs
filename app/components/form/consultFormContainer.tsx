'use client'
import React, { useRef, useState } from 'react'
import Form from './components/form'
import Buttom from './components/buttom'
import Input from './components/input'
import TextArea from './components/textarea'
import {
  checkFullValidation,
  checkPartialValidation,
  getErrorsFromResult,
} from './consultFormValidation'
import { consultFormAction } from './consultFormAction'
import { refreshAction } from '@/app/(pages)/consults/actions/refresh'

export const ConsultFormContainer = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    consult: '',
  })

  const handleSubmit = async (formData: FormData) => {
    const result = checkFullValidation(formData)
    const response1 = getErrorsFromResult(result)
    setErrors({ ...errors, ...response1 })
    const response2 = await consultFormAction({ result, formData, formRef })
    if (response2?.message === 'success') refreshAction()
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
    <Form
      handleSubmit={handleSubmit}
      formRef={formRef}
      title="Ingresa tu Consulta"
    >
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
      <Buttom text="Enviar" textOnClick="...Espere..." />
    </Form>
  )
}

export default ConsultFormContainer

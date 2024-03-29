'use client'
import type React from 'react'
import { useRef, useState } from 'react'
import Form from '../components/form'
import Button from '../components/button'
import Input from '../components/input'
import TextArea from '../components/textarea'
import {
  checkFullValidation,
  checkPartialValidation,
  getErrorsFromResult,
} from './validations'
import { formAction } from './formAction'
import { refreshAction } from '@/app/(pages)/consults/actions/refresh'

export const Container = () => {
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
    const response2 = await formAction({ result, formData, formRef })
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
    <div className="card bg-base-300 mb-2 w-full mx-4 max-w-xl">
      <Form
        handleSubmit={handleSubmit}
        formRef={formRef}
        title="Ingresa tu Consulta o Código de Compra"
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
            text: 'Mensaje o Código de Compra',
            placeholder: 'Ingresa tu consulta o código de compra',
            id: 'consult',
            name: 'consult',
            error: errors.consult,
          }}
          handleBlur={handleBlur}
        />
        <Button text="Enviar" textOnClick="...Espere..." />
      </Form>
    </div>
  )
}

export default Container

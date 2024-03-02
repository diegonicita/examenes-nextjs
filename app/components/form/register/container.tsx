'use client'
import React, { useRef, useState } from 'react'
import Form from '../components/form'
import Buttom from '../components/buttom'
import Input from '../components/input'
import {
  checkFullValidation,
  checkPartialValidation,
  getErrorsFromResult,
} from './validations'
import { formAction } from './formAction'
import { redirect } from 'next/navigation'

export const Container = ({ disabled }: { disabled: boolean }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = async (formData: FormData) => {
    const result = checkFullValidation(formData)
    const response1 = getErrorsFromResult(result)
    setErrors({ ...errors, ...response1 })
    const response2 = await formAction({ result, formData, formRef })
    if (response2?.message === 'success') {
      redirect('/')
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
        username: event.target.id === 'username' ? undefined : true,
        email: event.target.id === 'email' ? undefined : true,
        password: event.target.id === 'password' ? undefined : true,
        confirmPassword:
          event.target.id === 'confirmPassword' ? undefined : true,
      },
    )
    const response = getErrorsFromResult(result)
    setErrors({ ...errors, ...response })
  }

  return (
    <div className="card w-full bg-base-300 mb-2">
      <Form
        handleSubmit={handleSubmit}
        formRef={formRef}
        title="Crea tu Cuenta"
      >
        <fieldset disabled={disabled}>
          <Input
            data={{
              type: 'text',
              text: 'Usuario',
              placeholder: 'Crea tu nombre de usuario',
              id: 'username',
              name: 'username',
              error: errors.username,
            }}
            handleBlur={handleBlur}
          />
          <Input
            data={{
              type: 'text',
              text: 'Email',
              placeholder: 'Ingresa tu email',
              id: 'email',
              name: 'email',
              error: errors.email,
            }}
            handleBlur={handleBlur}
          />
          <Input
            data={{
              type: 'password',
              text: 'Contraseña',
              placeholder: 'Ingresa tu contraseña',
              id: 'password',
              name: 'password',
              error: errors.password,
            }}
            handleBlur={handleBlur}
          />
          <Input
            data={{
              type: 'password',
              text: 'Repite tu contraseña',
              placeholder: 'Repite tu contraseña',
              id: 'confirmPassword',
              name: 'confirmPassword',
              error: errors.confirmPassword,
            }}
            handleBlur={handleBlur}
          />
          <Buttom text="Registrarse" textOnClick="...Espere..." />
        </fieldset>
      </Form>
    </div>
  )
}

export default Container

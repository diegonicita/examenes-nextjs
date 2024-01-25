'use client'
import React, { useRef, useState } from 'react'
import Form from './components/form'
import Buttom from './components/buttom'
import Input from './components/input'
import TextArea from './components/textarea'
import { checkFullValidation, getErrorsFromResult } from './loginFormValidation'
import { loginFormAction } from './loginFormAction'

export const LoginFormContainer = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (formData: FormData) => {
    const result = checkFullValidation(formData)
    console.log(result)
    const response = getErrorsFromResult(result)
    console.log(response)
    setErrors({ ...errors, ...response })
    loginFormAction({ result, formData, formRef })
  }

  const handleBlur = () => {
    const result = checkFullValidation(
      new FormData(formRef.current as HTMLFormElement),
    )
    const response = getErrorsFromResult(result)
    setErrors({ ...errors, ...response })
  }

  return (
    <div className="card w-full bg-base-300 mb-2">
      <Form handleSubmit={handleSubmit} formRef={formRef}>
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
            text: 'Password',
            placeholder: 'Ingresa tu contraseña',
            id: 'password',
            name: 'password',
            error: errors.password,
          }}
          handleBlur={handleBlur}
        />
        <Buttom text="Ingresar" textOnClick="...Espere..." />
      </Form>
    </div>
  )
}

export default LoginFormContainer

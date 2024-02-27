'use client'
import React, { useRef, useState } from 'react'
import Form from './components/form'
import Buttom from './components/buttom'
import Input from './components/input'
import {
  checkFullValidation,
  checkPartialValidation,
  getErrorsFromResult,
} from './loginFormValidation'
import { signIn } from 'next-auth/react'
import { AuthError } from 'next-auth'

type Props = {
  initialEmail: string | undefined
  initialPassword: string | undefined
  disabled: boolean
}

export const LoginFormContainer = ({ disabled }: Props) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (formData: FormData) => {
    const result = checkFullValidation(formData)
    const response1 = getErrorsFromResult(result)
    setErrors({ ...errors, ...response1 })
    if (!result.success) return null
    try {
      await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
      })
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            setErrors({ ...errors, password: 'Invalid credentials' })
            return 'Invalid credentials.'
          default:
            setErrors({ ...errors, password: 'Something went wrong.' })
            return 'Something went wrong.'
        }
      }
      throw error
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
        email: event.target.id === 'email' ? undefined : true,
        password: event.target.id === 'password' ? undefined : true,
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
        title="¡Bienvenido a Exámenes!"
      >
        <fieldset disabled={disabled}>
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
        </fieldset>
      </Form>
    </div>
  )
}

export default LoginFormContainer

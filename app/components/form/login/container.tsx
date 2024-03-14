'use client'
import React, { useRef, useState } from 'react'
import Form from '../components/form'
import Button from '../components/button'
import Input from '../components/input'
import {
  checkFullValidation,
  checkPartialValidation,
  getErrorsFromResult,
} from './validations'
import { formAction } from './formAction'
import ButtonGoogle from '../components/buttonGoogle'
import { useRouter, redirect } from 'next/navigation'

type Props = {
  urlLoginWithGoogle: string | undefined
  initialEmail: string | undefined
  initialPassword: string | undefined
  disabled: boolean
}

export const Container = ({ disabled, urlLoginWithGoogle }: Props) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })
  const router = useRouter()

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
        email: event.target.id === 'email' ? undefined : true,
        password: event.target.id === 'password' ? undefined : true,
      },
    )
    const response = getErrorsFromResult(result)
    setErrors({ ...errors, ...response })
  }

  return (
    <div className="card w-full bg-base-300 mb-2 mt-8">
      <Form handleSubmit={handleSubmit} formRef={formRef} title="">
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
          <Button text="Ingresar" textOnClick="...Espere..." />
          <div className="form-control">
            <div className="flex justify-center">
              <ButtonGoogle
                aria-label="Sign in with Google"
                handleClick={() =>
                  urlLoginWithGoogle && router.push(urlLoginWithGoogle)
                }
                text="Sign in with Google"
                textOnClick={''}
              />
            </div>
          </div>
        </fieldset>
      </Form>
    </div>
  )
}

export default Container

'use client'
import React, { startTransition, useRef, useState } from 'react'
import Form from '../components/form'
import Buttom from '../components/buttom'
import Input from '../components/input'
import {
  checkFullValidation,
  checkPartialValidation,
  getErrorsFromResult,
} from './validations'
import { sendEmail } from './sendEmail'
import { sendCode } from './sendCode'
import { redirect } from 'next/navigation'
import ButtomHandleClick from '../components/buttomHandleClick'
import { handleLogout } from '../../navbar/helper/handleLogout'

type Props = {
  initialEmail: string | undefined
  initialPassword: string | undefined
  disabled: boolean
}

export const Container = ({ disabled }: Props) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })
  const [email, setEmail] = useState<string | null>(null)
  const [codeInputEnabled, setCodeInputEnabled] = useState(false)

  const handleSendCode = async (formData: FormData) => {
    const code = formData.get('code')
    if (code && email) {
      formData.set('email', email)
      formData.set('code', code)
      const response = await sendCode({
        formData,
        formRef,
      })
      handleLogout()
    }
  }

  const handleSendEmail = async (formData: FormData) => {
    const result = checkFullValidation(formData)
    console.log(result)
    const response1 = getErrorsFromResult(result)
    console.log(response1)
    setErrors({ ...errors, ...response1 })
    console.log('Action')
    const response2 = await sendEmail({
      result,
      formData,
      formRef,
    })
    console.log(response2)
    if (response2?.message === 'success') {
      setCodeInputEnabled(true)
      const _email = formData?.get('email') as string
      setEmail(_email)
    }
  }

  const handleSkipSendEmail = async (formData: FormData) => {
    const result = checkFullValidation(formData)
    console.log(result)
    const response1 = getErrorsFromResult(result)
    console.log(response1)
    setErrors({ ...errors, ...response1 })
    if (result.success) {
      console.log('Action Skip')
      setCodeInputEnabled(true)
      const _email = formData?.get('email') as string
      setEmail(_email)
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
      },
    )
    const response = getErrorsFromResult(result)
    setErrors({ ...errors, ...response })
  }

  return (
    <div className="card w-full bg-base-300 mb-2">
      <Form
        handleSubmit={handleSendEmail}
        formRef={formRef}
        title="Verificación de tu Email"
      >
        <fieldset disabled={disabled}>
          {!codeInputEnabled && (
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
          )}
          {codeInputEnabled && (
            <Input
              data={{
                type: 'password',
                text: 'Código de Verificación',
                placeholder: 'Código de verificación',
                id: 'code',
                name: 'code',
                error: errors.password,
              }}
              handleBlur={handleBlur}
            />
          )}
          {!codeInputEnabled && (
            <>
              <Buttom text="Solicitar Código" textOnClick="...Espere..." />
              <ButtomHandleClick
                text="Tengo un Codigo: Continuar"
                textOnClick="...Espere..."
                handleClick={() => {
                  const formData = new FormData(
                    formRef.current as HTMLFormElement,
                  )
                  handleSkipSendEmail(formData)
                }}
              />
            </>
          )}
          {codeInputEnabled && (
            <ButtomHandleClick
              text="Enviar Código"
              textOnClick="...Espere..."
              handleClick={() => {
                const formData = new FormData(
                  formRef.current as HTMLFormElement,
                )
                handleSendCode(formData)
              }}
            />
          )}
        </fieldset>
      </Form>
    </div>
  )
}

export default Container

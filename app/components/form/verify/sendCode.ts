'use client'
import type React from 'react'
import { notifyErrors } from '@/app/components/form/components/notifyErrors'
import { notifySuccess } from '@/app/components/form/components/notifySuccess'
import { sendCodeAction } from '../actions/verify/sendCodeAction'

type Props = {
  formData: FormData
  formRef: React.MutableRefObject<HTMLFormElement | null> | undefined
}

type Response = {
  isError: boolean
  message: 'error' | 'success' | 'user verified'
}

export const sendCode = async ({ formData, formRef }: Props) => {
  try {
    const resp = await sendCodeAction(formData)
    if (resp?.isError === false) {
      notifySuccess('Usuario Verificado!')
      if (formRef?.current) {
        formRef?.current.reset()
      }
      return { message: 'success' }
    }
      if (resp?.message === 'user verified') {
        notifySuccess('Usuario ya verificado')
        return { message: 'Errores en el proceso de verificación' }
      }
      notifyErrors('Falló el envío del Código. Inténtalo mas tarde.')
      return { message: 'Errores en el proceso de verificación' }
  } catch (error) {
    console.log(error)
    return { message: 'error try catch en verify' }
  }
}

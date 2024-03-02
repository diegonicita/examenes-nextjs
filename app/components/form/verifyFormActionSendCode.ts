'use client'
import React from 'react'

import { notifyErrors } from '@/app/components/form/toasters/notifyErrors'
import { notifySuccess } from '@/app/components/form/toasters/notifySuccess'
import { sendCodeAction } from '@/app/components/form/actions/sendCodeAction'

type Props = {
  result: { success: any }
  formData: FormData
  formRef: React.MutableRefObject<HTMLFormElement | null> | undefined
}

type Response = {
  isError: boolean
  message: 'error' | 'success' | 'user verified'
}

export const verifyFormActionSendCode = async ({
  result,
  formData,
  formRef,
}: Props) => {
  if (result.success) {
    console.log(formData.get('email'))
    try {
      const resp: Response = await sendCodeAction(formData)
      console.log(resp)
      if (resp?.isError === false) {
        notifySuccess('Código enviado exitosamente!')
        if (formRef?.current) {
          formRef?.current.reset()
        }
        return { message: 'success' }
      } else {
        if (resp.message === 'user verified') {
          notifySuccess('Usuario ya verificado')
          return { message: 'Errores en el proceso de verificación' }
        }
        notifyErrors('Falló el envío del Código. Inténtalo mas tarde.')
        return { message: 'Errores en el proceso de verificación' }
      }
    } catch (error) {
      console.log(error)
      return { message: 'error try catch en verify' }
    }
  }
}

'use client'
import React from 'react'

import { notifyErrors } from '@/app/components/form/components/notifyErrors'
import { notifySuccess } from '@/app/components/form/components/notifySuccess'
import { registerAction } from '@/app/components/form/actions/register/registerAction'

type Props = {
  result: { success: any }
  formData: FormData
  formRef: React.MutableRefObject<HTMLFormElement | null> | undefined
}

export const formAction = async ({
  result,
  formData,
  formRef,
}: Props) => {
  if (result.success) {
    try {
      const resp = await registerAction(formData)
      console.log(resp)
      if (resp?.message === 'success') {
        notifySuccess('Register exitoso. Bienvenido')
        if (formRef?.current) {
          formRef?.current.reset()
        }
        return { message: 'success' }
      } else {
        notifyErrors('El Register falló. Inténtalo mas tarde.')
        return { message: 'Errores en el registro' }
      }
    } catch (error) {
      console.log(error)
      return { message: 'error try catch en register' }
    }
  }
}

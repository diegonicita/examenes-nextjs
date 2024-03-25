'use client'
import type React from 'react'

import { notifyErrors } from '@/app/components/form/components/notifyErrors'
import { notifySuccess } from '@/app/components/form/components/notifySuccess'
import { loginAction } from '@/app/components/form/actions/login/loginAction'

type Props = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  result: { success: any }
  formData: FormData
  formRef: React.MutableRefObject<HTMLFormElement | null> | undefined
}

export const formAction = async ({ result, formData, formRef }: Props) => {
  if (result.success) {
    try {
      const resp = await loginAction(formData)      
      if (resp?.isError === false) {
        notifySuccess('Login exitoso. Bienvenido')
        if (formRef?.current) {
          formRef?.current.reset()
        }
        return { message: 'success' }
      }
        notifyErrors('Falló el Login. Inténtalo mas tarde.')
        return { message: 'Errores en el logueo' }
    } catch (error) {      
      return { message: 'error try catch en login' }
    }
  }
}

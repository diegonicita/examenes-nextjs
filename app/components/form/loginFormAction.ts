'use client'
import React from 'react'

import { notifyErrors } from '@/app/components/form/toasters/notifyErrors'
import { notifySuccess } from '@/app/components/form/toasters/notifySuccess'
import { loginAction } from '@/app/components/form/actions/loginAction'

type Props = {
  result: { success: any }
  formData: FormData
  formRef: React.MutableRefObject<HTMLFormElement | null> | undefined
}

export const loginFormAction = async ({ result, formData, formRef }: Props) => {
  if (result.success) {
    const resp = await loginAction(formData)
    console.log(resp)
    if (resp?.isError === false) {
      notifySuccess()
      if (formRef?.current) {
        formRef?.current.reset()
      }
    } else {
      notifyErrors()
    }
  }
}

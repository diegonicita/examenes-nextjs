'use client'
import React from 'react'
import { insertConsult } from '@/app/components/form/actions/insertConsult'
import { notifyErrors } from '@/app/components/form/toasters/notifyErrors'
import { notifySuccess } from '@/app/components/form/toasters/notifySuccess'
import type { ConsultFormActionType } from '@/app/models/actions/ConsultFormAction'

export const consultFormAction = async ({
  result,
  formData,
  formRef,
}: ConsultFormActionType) => {
  if (result.success) {
    const resp = await insertConsult(formData)
    if (resp?.message === 'success') {
      notifySuccess('Consulta enviada exitosamente. Gracias')
      if (formRef?.current) {
        formRef?.current.reset()
      }
      return { message: 'success' }
    } else {
      notifyErrors('Consulta no enviada. Intenta más tarde.')
      return { message: 'error' }
    }
  }
}

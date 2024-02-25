'use client'
import { ConsultType } from '@/app/models/Consult'
import React from 'react'
//@ts-ignore
import { useFormStatus, useFormState } from 'react-dom'

const initialState = {
  message: 'Consulta Borrada Exitosamente...',
}

export default function DeleteButton({
  id,
  deleteAction,
}: {
  id: number
  deleteAction: (
    prevState: ConsultType,
    formData: FormData,
  ) => Promise<{ message: string } | undefined>
}) {
  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(deleteAction, initialState)

  return (
    <form
      className="flex justify-end absolute right-1 top-1"
      name="consultf"
      action={formAction}
    >
      <input type="hidden" name="id" id="id" defaultValue={id} />
      <button
        name="delete"
        type="submit"
        className="btn btn-error btn-sm text-error-content"
      >
        X
      </button>
    </form>
  )
}

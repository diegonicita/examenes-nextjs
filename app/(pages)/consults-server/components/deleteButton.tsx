'use client'
import React from 'react'
//@ts-ignore
import { useFormStatus, useFormState } from 'react-dom'
import { deleteAction } from '@/app/(pages)/consults-server/actions/delete'

const initialState = {
  message: 'Consulta Borrada Exitosamente...',
}

export default function DeleteButton({ id }: { id: number }) {
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

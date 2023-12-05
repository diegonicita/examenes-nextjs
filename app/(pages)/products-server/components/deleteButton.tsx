'use client'
//@ts-ignore
import { useFormStatus, useFormState } from 'react-dom'
import { deleteAction } from '@/app/(pages)/products-server/actions/delete'

const initialState = {
  message: 'Producto Borrado Exitosamente...',
}

export default function deleteProduct({ id }: { id: number }) {
  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(deleteAction, initialState)

  return (
    <form
      className="flex justify-end absolute right-1 top-1"
      name="productf"
      action={formAction}
    >
      <input type="hidden" name="id" id="id" defaultValue={id} />
      <button
        name="insert"
        type="submit"
        className="btn btn-error btn-sm text-error-content"
      >
        X
      </button>
    </form>
  )
}

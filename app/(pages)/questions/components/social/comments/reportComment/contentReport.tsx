import { refreshAction } from '@/app/(pages)/consults/actions/refresh'
import reportComment from '@/app/(pages)/questions/actions/reportComment/reportComent'
import { notifyErrors } from '@/app/components/form/components/notifyErrors'
import { notifySuccess } from '@/app/components/form/components/notifySuccess'
import { useDropDownContext } from '@/app/hooks/questions/comments/useDropDown'
import { useEffect, useState } from 'react'
//@ts-ignore
import { useFormState, useFormStatus } from 'react-dom'
const initialState = {
  message: '',
}
function Submit({ empty }: { empty: boolean }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      className={`${pending || empty ? 'btn btn-disabled' : 'btn btn-accent'}`}
      disabled={pending || empty}
    >
      {pending ? 'reportando' : 'reportar'}
    </button>
  )
}

export default function ContentReport({ id }: { id: string | number }) {
  const [state, formAction] = useFormState(reportComment, initialState)
  const [empty, setEmpty] = useState('')
  console.log(state)

  useEffect(() => {
    if (state?.message === 'success') {
      notifySuccess('Tu comentario ha sido reportado exitosamente')
      closeDropdown()
    } else {
      if (state?.message === 'error reporting comment') {
        notifyErrors('Tu reporte falló. Inténtalo más tarde.')
        closeDropdown()
      }
    }
  }, [state?.message])

  const { closeDropdown } = useDropDownContext()
  return (
    <dialog id="content_report" className="modal">
      <form action={formAction}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">
            Escribe la razon por la que quieres reportar este comentario
          </h3>
          <input type="hidden" name="id" value={id} />
          <textarea
            placeholder="Reportar commentario"
            value={empty}
            name="report"
            onChange={(e) => setEmpty(e.target.value)}
            className="mb-2 p-3 resize-none outline-none w-full border border-gray-300"
          />
          {/* if there is a button in form, it will close the modal */}
          <div className="flex justify-end gap-x-2">
            <button
              className="btn"
              type="button"
              onClick={() => {
                const modal = document.getElementById(
                  'content_report',
                ) as HTMLDialogElement
                if (modal) {
                  modal.close()
                  closeDropdown()
                }
              }}
            >
              Close
            </button>
            <Submit empty={!empty.trim()} />
          </div>
        </div>
      </form>
    </dialog>
  )
}

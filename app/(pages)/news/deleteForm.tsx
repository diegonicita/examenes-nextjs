//@ts-ignore
import { useFormState } from 'react-dom'
import { IconTrashCan } from '../questions/components/social/comments/icons/iconTrash'
import deleteNew from './action/deleteNew/delete'
const initialState = {
  message: '',
}
export default function DeleteForm({ id }: { id: string | number }) {
  const [state, formAction] = useFormState(deleteNew, initialState)

  console.log(state)

  const handleStopPropagation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
  }

  return (
    <form action={formAction}>
      <input type='hidden' name='id' value={id} />
      <button
        type='submit'
        className='h-4 -ml-5 mt-2'
        onClick={handleStopPropagation}
      >
        <IconTrashCan />
      </button>
    </form>
  )
}

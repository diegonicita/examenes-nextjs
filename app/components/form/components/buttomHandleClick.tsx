'use client'
//@ts-ignore
import { useFormStatus } from 'react-dom'

function Buttom2({
  text,
  textOnClick,
  handleClick,
}: {
  text: string
  textOnClick: string
  handleClick: () => void
}) {
  const { pending } = useFormStatus()

  return (
    <div className="form-control mt-6">
      <div className="flex justify-center sm:min-w-80">
        <button
          type="button"
          className="btn btn-accent w-full max-w-60"
          disabled={pending}
          name="text"
          onClick={handleClick}
        >
          {!pending ? text : textOnClick}
        </button>
      </div>
    </div>
  )
}

export default Buttom2

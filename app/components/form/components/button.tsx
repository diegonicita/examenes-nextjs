'use client'
//@ts-ignore
import { useFormStatus } from 'react-dom'

function Button({ text, textOnClick }: { text: string; textOnClick: string }) {
  const { pending } = useFormStatus()

  return (
    <div className="form-control mt-6">
      <div className="flex justify-center sm:min-w-80">
        <button
          type="submit"
          className="btn btn-accent w-full max-w-60"
          disabled={pending}
          name="text"
        >
          {!pending ? text : textOnClick}
        </button>
      </div>
    </div>
  )
}

export default Button

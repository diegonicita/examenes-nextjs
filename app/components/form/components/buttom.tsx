'use client'
//@ts-ignore
import { useFormStatus } from 'react-dom'

function Button({ text, textOnClick }: { text: string; textOnClick: string }) {
  const { pending } = useFormStatus()

  return (
    <div className="form-control mt-6">
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {!pending ? text : textOnClick}
      </button>
    </div>
  )
}

export default Button

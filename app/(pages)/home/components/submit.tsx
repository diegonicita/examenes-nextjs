'use client'
//@ts-ignore
import { useFormStatus } from 'react-dom'

export default function SubmitButtom({
  text,
  textOnClick,
}: {
  text: string
  textOnClick: string
}) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className="w-40 h-14 bg-accent rounded-md btn btn-accent text-accent-content text-center"
      disabled={pending}
    >
      {!pending ? text : textOnClick}
    </button>
  )
}

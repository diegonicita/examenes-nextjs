'use client'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
//@ts-ignore
import { useFormStatus } from 'react-dom'
import GoogleIcon from './icons/googleIcon'

function Button({ text, textOnClick }: { text: string; textOnClick: string }) {
  const { pending } = useFormStatus()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  const onClick = (provider: 'google') => {
    signIn(provider, {
      callbackUrl: callbackUrl || '/',
    })
  }

  return (
    <div className="form-control w-full">
      <button
        type="button"
        className="btn btn-base text-base-content w-full"
        disabled={pending}
        onClick={() => onClick('google')}
      >
        <GoogleIcon />
        {!pending ? text : textOnClick}
      </button>
    </div>
  )
}

export default Button

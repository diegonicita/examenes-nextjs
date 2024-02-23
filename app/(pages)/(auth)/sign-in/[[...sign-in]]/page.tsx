'use server'
import { SignIn } from '@clerk/nextjs'

export default async function Page() {
  return (
    <div className="hero-content mx-auto max-w-sm">
      <div className="hero-content mx-auto max-w-sm">
        <div className="flex flex-col justify-stretch items-stretch gap-4">
          <SignIn />
        </div>
      </div>
    </div>
  )
}

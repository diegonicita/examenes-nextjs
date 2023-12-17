import Client from './components/client'

export default function Login() {
  const email = process.env.USER_EMAIL
  const password = process.env.USER_PASSWORD

  return (
    <div className="mt-8 hero-content mx-auto max-w-sm">
      <div className="mt-8 hero-content mx-auto max-w-sm">
        <div className="flex flex-col justify-stretch items-stretch gap-4">
          <Client initialEmail={email} initialPassword={password} />
        </div>
      </div>
    </div>
  )
}

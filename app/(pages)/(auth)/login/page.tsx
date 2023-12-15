import Client from './components/client'

export default function Login() {
  const url = process.env.URL_LOGIN
  const urlAPI = process.env.URL_API
  const email = process.env.USER_EMAIL
  const password = process.env.USER_PASSWORD
  const showLoginErrors = process.env.SHOW_LOGIN_ERRORS === "true" ? true : false

  return (
    <div className="mt-8 hero-content mx-auto max-w-sm">
      <div className="mt-8 hero-content mx-auto max-w-sm">
        <div className="flex flex-col justify-stretch items-stretch gap-4">
          <Client
            url={url}
            urlAPI={urlAPI}
            initialEmail={email}
            initialPassword={password}
            showLoginErrors={showLoginErrors}
          />
        </div>
      </div>
    </div>
  )
}

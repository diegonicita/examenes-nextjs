'use server'

import { cookies } from 'next/headers'

type State = {
  email: string
  password: string
  message: string
}

export const loginAction = async (prevState: State, formData: FormData) => {
  const url = process.env.URL_LOGIN
  const email = formData.get('email')
  const password = formData.get('password')
  if (url) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: 'include', // incluir la cookie en las solicitudes
      cache: 'no-store',
    })
    const result = await response.json()
    console.log(result)
    if (result.isError === false) {
      cookies().set('auth', result.token)
      return {
        response: 'login exitoso',
        message: result.message,
      }
    }
    if (result.isError === true) {
      return {
        response: 'login fallido',
        message: result.message,
      }
    }
    return {
      message: JSON.stringify(result),
    }
  }
  return null
}

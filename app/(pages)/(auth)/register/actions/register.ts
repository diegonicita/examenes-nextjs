'use server'

import { cookies } from 'next/headers'

type State = {
  username: string
  email: string
  password: string
  message: string
}

export const registerAction = async (prevState: State, formData: FormData) => {
  const url = process.env.URL_REGISTER
  const username = formData.get('username')
  const email = formData.get('email')
  const password = formData.get('password')
  if (url) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
       credentials: 'include', // incluir la cookie en las solicitudes
    })
    const result = await response.json()
    console.log(result)
    if (result.isError === false) {
      cookies().set('auth', result.token)
      return {
        response: 'register exitoso',
        message: result.message,
      }
    }
    if (result.isError === true) {
      return {
        response: 'register fallido',
        message: result.message,
      }
    }
    return {
      message: JSON.stringify(result),
    }
  }
  return null
}
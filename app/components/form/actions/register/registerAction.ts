'use server'
import { cookies } from 'next/headers'

export const registerAction = async (formData: FormData) => {
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
      cache: 'no-store',
    })
    const result = await response.json()    
    if (result.isError === false) {
      cookies().set('auth', result.token)
      return {
        response: 'register exitoso',
        message: 'success',
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

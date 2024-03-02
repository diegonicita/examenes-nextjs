'use server'

import { cookies } from 'next/headers'

export const loginAction = async (formData: FormData) => {
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
    if (result.isError === false) {
      cookies().set('auth', result.token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 2,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production', // solo se enviará en HTTPS en producción
      })
    }
    return result
  }
}

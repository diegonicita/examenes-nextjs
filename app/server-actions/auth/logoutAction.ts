'use server'

import { cookies } from 'next/headers'

export const logoutAction = async () => {
  // Obtén el valor actual de la cookie 'auth'
  const authCookie = cookies().get('auth')
  const authToken = cookies().get('token')
  let message = ''
  if (authCookie) {
    cookies().set('auth', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // solo se enviará en HTTPS en producción
      expires: new Date(0),
      sameSite: 'strict',
      path: '/',
    })
    message = 'success'
  } else {
    message = 'error'
  }
  if (authToken) {
    const config: {
      httpOnly: boolean
      secure: boolean
      expires: Date
      domain?: string
    } = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // solo se enviará en HTTPS en producción
      expires: new Date(0),
      domain: '.examenes.com.ar',
    }

    if (process.env.NODE_ENV === 'development') {
      config.domain = undefined
    }

    cookies().set('token', '', config)
    message = 'success'
  } else {
    message = 'error'
  }
  return { message }
}

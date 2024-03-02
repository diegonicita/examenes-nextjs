'use server'

import { cookies } from 'next/headers'

export const logoutAction = async () => {
  // Obtén el valor actual de la cookie 'auth'
  const authCookie = cookies().get('auth')

  if (authCookie) {
    cookies().set('auth', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // solo se enviará en HTTPS en producción
      expires: new Date(0),
      sameSite: 'strict',
      path: '/',
    })
    return {
      message: 'success',
    }
  } else {
    // Devuelve un mensaje indicando que la cookie 'auth' ya había expirado o no estaba presente
    return {
      message: 'error',
    }
  }
}

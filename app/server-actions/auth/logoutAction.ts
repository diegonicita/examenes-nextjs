'use server'

import { cookies } from 'next/headers'

export const logoutAction = async () => {
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
}

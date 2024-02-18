'use server'

import { cookies } from 'next/headers'

export const loginForced = async () => {
  console.log('trying to login')
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZ…M0N30.LZ-MbDlJoX8USopnsInIipRR9MfQMpWwFYpEdQ7tp7k'
  cookies().set('auth333', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 2,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  })
  return {
    isError: false,
    errors: null,
    message: 'Login exitoso',
    userResponse: {
      id: 8,
      username: 'diego nicita',
      email: 'diego1@gmail.com',
      rol: 'admin',
    },
    token: token,
    status: 200,
  }
}

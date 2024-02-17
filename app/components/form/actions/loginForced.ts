'use server'

import { cookies } from 'next/headers'

export const loginForced = async () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJkaWVnbzFAZ21haWwuY29tIiwidXNlcm5hbWUiOiJkaWVnbyBuaWNpdGEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDgxODk0NjQsImV4cCI6MTcwODE5NjY2NH0._sPiDLIoHlS5KvPzlo8i8aHE2gpRp0jiOZU63RO_dz8'
  cookies().set('auth', token, {
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

'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

type State = {
  email: string
  password: string
  message: string
}

export const logoutAction = async (prevState: State, formData: FormData) => {
  cookies().set('auth', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // solo se enviará en HTTPS en producción
    expires: new Date(0),
    sameSite: 'strict',
    path: '/',
  })
  return {
    message: JSON.stringify('logout ok'),
  }
}

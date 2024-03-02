'use server'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

export const sendCodeAction = async (formData: FormData) => {
  const url = process.env.URL_VERIFY_SEND_CODE
  const email = formData.get('email')
  const code = formData.get('code')
  let token = null
  if (process.env.JWT_SECRET === undefined) {
    throw new Error('JWT_SECRET is not defined')
  }
  const uuidSchema = z
    .string()
    .refine(
      (value) =>
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          value,
        ),
      {
        message: 'Debe ser un UUID válido',
      },
    )

  const resultado = uuidSchema.safeParse(code)
  if (!resultado.success) {
    return {
      isError: true,
      message: 'Codigo Inválido',
    }
  }

  console.log('Hola')

  token = jwt.sign(
    {
      name: 'examenes',
      email: email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1min',
    },
  )

  if (url) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
        code,
      }),
      credentials: 'include', // incluir la cookie en las solicitudes
      cache: 'no-store',
    })
    const result = await response.json()
    console.log(result)
    return result
  }
  return null
}

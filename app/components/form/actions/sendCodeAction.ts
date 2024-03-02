'use server'
import jwt from 'jsonwebtoken'

export const sendCodeAction = async (formData: FormData) => {
  const url = process.env.URL_VERIFY
  const email = formData.get('email')
  let token = null
  if (process.env.JWT_SECRET === undefined) {
    throw new Error('JWT_SECRET is not defined')
  }

  token = jwt.sign(
    {
      name: 'examenes',
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
      }),
      credentials: 'include', // incluir la cookie en las solicitudes
      cache: 'no-store',
    })
    const result = await response.json()
    return result
  }
  return null
}

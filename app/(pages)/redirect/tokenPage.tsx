'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

const TokenPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  // Lógica para procesar el token y redirigir
  useEffect(() => {
    if (token) {
      // Aquí puedes realizar cualquier lógica necesaria con el token
      console.log('Token recibido:', token)
      const decoded = jwtDecode(token)
      console.log('Decoded token:', decoded)
      // Puedes redirigir a otra página usando el objeto router
      router.push('/')
    }
  }, [token, router])

  // Esta página no tiene contenido visible para el usuario
  return <div> Token Page </div>
}

export default TokenPage

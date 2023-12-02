import { selectToken, useSelector } from '@/app/lib/redux'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export const useLogged = (action: 'redirect' | undefined) => {
  const [isLogged, setIsLogged] = useState(false)
  const token = useSelector(selectToken)
  const router = useRouter()

  useEffect(() => {
    if (token && action === 'redirect') {
      router.push('/')
    }
    if (token) {
      setIsLogged(true)
    }
  }, [token, router])

  return isLogged
}

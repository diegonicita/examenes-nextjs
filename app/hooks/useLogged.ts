import { selectToken, useSelector, useDispatch, userSlice } from '@/app/lib/redux'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export const useLogged = (action: 'redirect' | undefined) => {
  const [isLogged, setIsLogged] = useState(false)
  const token = useSelector(selectToken)
  const router = useRouter()
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(userSlice.actions.logout())
    setIsLogged(false)
    return
  }

  useEffect(() => {
    if (token && action === 'redirect') {
      router.push('/')
    }
    if (token) {
      setIsLogged(true)
    }
  }, [token, router])

  return {isLogged, logout}
}

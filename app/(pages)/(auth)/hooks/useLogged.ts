import {  
  useDispatch,
  userSlice,
} from '@/app/lib/redux'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export const useLogged = (action: 'redirect' | undefined) => {
  const [isLogged, setIsLogged] = useState(false) 
  const router = useRouter()
  const dispatch = useDispatch()

  const logout = async () => {
    dispatch(userSlice.actions.logout())
    setIsLogged(false)    
    Cookies.remove('auth')
    router.refresh()
    return
  }

  useEffect(() => {
    if (Cookies.get('auth') && action === 'redirect') {
      router.refresh()
      router.push('/')
    }
    if (Cookies.get('auth')) {
      setIsLogged(true)
    }
  }, [Cookies.get('auth'), router])

  return { isLogged, logout }
}

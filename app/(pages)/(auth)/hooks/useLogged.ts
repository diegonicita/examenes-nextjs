import {  
  useDispatch,
  userSlice,
} from '@/app/lib/redux'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useCookieInterval } from './useCookieInterval'

export const useLogged = (action: 'redirect' | undefined) => {
  const [isLogged, setIsLogged] = useState(false)
  const { cookie } = useCookieInterval('auth', 1000)  
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
    if (cookie && action === 'redirect') {
      router.refresh()
      router.push('/')
    }
    if (cookie) {
      setIsLogged(true)
    }
  }, [cookie, router])

  return { isLogged, logout }
}

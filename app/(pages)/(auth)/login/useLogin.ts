import { useState } from 'react'
import { loginService } from './service'
import { userSlice, useDispatch } from '@/app/lib/redux'

export const useLogin = () => {
  const [loginResponse, setLoginResponse] = useState(null)
  const dispatch = useDispatch()

  const handleSubmitLogin = async (data: any) => {
    const resp = await loginService(data)
    setLoginResponse(resp)
    dispatch(
      userSlice.actions.changeUser({
        username: resp?.username ?? null,
        token: resp?.token ?? null,
        email: resp?.userResponse.email ?? null
      }),
    )
  }

  return { handleSubmitLogin, loginResponse }
}

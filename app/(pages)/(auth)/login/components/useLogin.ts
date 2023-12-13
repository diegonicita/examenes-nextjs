import { useState } from 'react'
import { loginService } from './service'
import { userSlice, useDispatch } from '@/app/lib/redux'

export const useLogin = (url: string | undefined, urlAPI: string | undefined) => {
  const [loginResponse, setLoginResponse] = useState(null)
  const dispatch = useDispatch()

  const handleSubmitLogin = async (data: any) => {
    const resp = await loginService(data, url, urlAPI)
    setLoginResponse(resp)
    dispatch(
      userSlice.actions.changeUser({
        username: resp?.username ?? null,
        token: null,
        email: resp?.userResponse.email ?? null,
      }),
    )
  }

  return { handleSubmitLogin, loginResponse }
}

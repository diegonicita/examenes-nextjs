import { useState } from 'react'
import { loginService } from './service'

export const useLogin = () => {
  const [loginResponse, setLoginResponse] = useState(null)

  const handleSubmitLogin = async (data: any) => {
    const resp = await loginService(data)
    setLoginResponse(resp)
  }

  return { handleSubmitLogin, loginResponse }
}
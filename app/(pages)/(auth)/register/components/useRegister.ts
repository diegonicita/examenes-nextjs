import { useState } from 'react'
import { registerService } from './service'

export const useRegister = () => {
  const [registerResponse, setRegisterResponse] = useState(null)

  const handleSubmitRegister = async (data: any) => {
    const resp = await registerService(data)
    setRegisterResponse(resp)
  }

  return { handleSubmitRegister, registerResponse }
}
'use client'
import { logoutAction } from '@/app/server-actions/auth/logoutAction'
import { notify } from '../notify'
import { refreshAction } from '@/app/(pages)/consults/actions/refresh'

export const handleLogout = async () => {
  const response = await logoutAction()  
  await new Promise((res) => setTimeout(res, 500))
  if (response?.message === 'success') {
    notify('Logout Exitoso. Hasta la próxima.')
    refreshAction()
  }
}

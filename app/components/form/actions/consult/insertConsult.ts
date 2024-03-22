'use server'

import executeQuery from '@/app/server-actions/helpers/mysqldb'
import type { RowDataPacket } from 'mysql2'
import { z } from 'zod'
// import jwt from 'jsonwebtoken'
import updateUserRole from './updateUserRole'
import getCodeId from './getCodeId'
import updateCodeAvailable from './updateCodeAvailable'
import { refreshAction } from '@/app/(pages)/consults/actions/refresh'

export const insertConsult = async (formData: FormData) => {
  const fullname = formData.get('fullname')
  const email = formData.get('email')
  const consult = formData.get('consult')

  const result = z
    .object({
      fullname: z
        .string()
        .min(3, { message: 'Debes ingresar al menos 3 caracteres' }),
      email: z.string().email({ message: 'Correo Electronico Invalido' }),
      consult: z
        .string()
        .min(5, { message: 'Debes ingresar al menos 5 caracteres' }),
    })
    .safeParse({
      fullname,
      email,
      consult,
    })

  if (result.success && consult !== null) {
    const isCodeValid = async (code: string) => {
      try {
        const id = await getCodeId(code)
        return id // Code is valid. return id.
      } catch (err) {
        return false // Code is invalid or error occurred
      }
    }

    const id = await isCodeValid(consult.toString())
    if (id !== false) {
      if (email) {        
        const result = (await updateUserRole(email.toString())) as {
          message: 'success' | 'error'
        }
        if (result.message === 'success') {
          updateCodeAvailable(id)
          await refreshAction()
        }
      }
    } else {
      console.log('Code is invalid or an error occurred.')
      // Handle invalid token case (e.g., deny access, prompt for login)
    }
  }

  // if (result.success && consult !== null) {
  //   const secret = process.env.JWT_SECRET
  //   function isValidToken(t: string) {
  //     if (secret)
  //       try {
  //         const resp = jwt.verify(t, secret)
  //         console.log(resp)
  //         return true // Token is valid
  //       } catch (err) {
  //         return false // Token is invalid or error occurred
  //       }
  //     return false
  //   }
  //   if (isValidToken(consult.toString())) {
  //     console.log('Token is valid!')
  //     if (email) actualizarRolUsuario(email.toString())
  //     // Proceed with authorized actions
  //   } else {
  //     console.log('Token is invalid or an error occurred.')
  //     // Handle invalid token case (e.g., deny access, prompt for login)
  //   }
  // }

  if (result.success) {
    try {
      const response = (await executeQuery(
        'insert into consultas values (NULL, ?, ?, ?)',
        [fullname, email, consult],
      )) as RowDataPacket

      if (response?.affectedRows) {
        return {
          message: 'success',
        }
      }
    } catch (error) {
      return {
        message: 'errors',
      }
    }
  }
}

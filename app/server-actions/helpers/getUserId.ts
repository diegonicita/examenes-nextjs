'use server'

import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'
import { z } from 'zod'
import { createUser } from './createUser'

export const getUserId = async (email: string) => {
  const validacion = z
    .object({
      email: z.string().email({ message: 'Correo Electronico Invalido' }),
    })
    .safeParse({ email })
  console.log(email)
  console.log(validacion)
  if (validacion.success) {
    try {
      const response = (await executeQuery(
        'select id, role from usuarios where email = ?',
        [email],
      )) as RowDataPacket
      console.log(response, 'response')      
      if (response && response.length > 0) {
        return {
          message: 'success',
          id: response[0].id,
          role: response[0].role,
        }
      }
      console.log("no existe el usuario. A crearlo.")
      // if email not founded create user
      const createResponse: { message: string; id: number } = await createUser(
        email,
      )
      if (createResponse.message === 'success') {
        console.log('usuario creado')
        return {
          message: 'success',
          id: createResponse.id,
          role: 'user',
        }
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'errors',
        id: null,
      }
    }
  }
  return {
    message: 'errors',
    id: null,
  }
}

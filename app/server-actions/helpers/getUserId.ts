'use server'

import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'
import { z } from 'zod'
import { createUser } from './createUser'

export const getUserId = async (email: string) => {
  const result = z
    .object({
      email: z.string().email({ message: 'Correo Electronico Invalido' }),
    })
    .safeParse({
      email,
    })

  if (result.success) {
    try {
      const response = (await executeQuery(
        'select id from usuarios where email = ?',
        [email],
      )) as RowDataPacket
      if (response && response.length > 0) {
        console.log(response)
        return {
          message: 'success',
          id: response[0].id,
        }
      }
      
      // if email not founded create user
      const response2 = createUser(email)

      return {
        message: 'email not founded. User Created.',
        id: null,
      }
    } catch (error) {
      return {
        message: 'errors',
        id: null,
      }
    }
  }
}

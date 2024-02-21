'use server'

import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'
import { z } from 'zod'

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
      // email not founded // create one
      try {
        const response = (await executeQuery(
          'insert into usuarios (email, role) values (?, "user")',
          [email],
        )) as RowDataPacket
        console.log(response)
        if (response && response?.affectedRows) {
          console.log(response?.affectedRows)
          return {
            message: 'user created',
            id: response?.insertId,
          }
        }
      } catch (error) {}

      return {
        message: 'email not founded',
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

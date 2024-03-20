'use server'

import executeQuery from '@/app/server-actions/helpers/mysqldb'
import type { RowDataPacket } from 'mysql2'
import { z } from 'zod'

export const createUser = async (email: string) => {
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
        'insert into usuarios (email, role) values (?, "user")',
        [email],
      )) as RowDataPacket
      console.log(response)
      if (response?.affectedRows) {
        console.log(response?.affectedRows)
        return {
          message: 'success',
          id: response?.insertId,
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return {
    message: 'error',
    id: null,
  }
}

'use server'

import executeQuery from '@/app/server-actions/helpers/mysqldb'
import type { RowDataPacket } from 'mysql2'
import { z } from 'zod'
import { createUser } from './createUser'

export default async function getUserIdOrCreateUser(email: string) {
  const validacion = z
    .object({
      email: z.string().email({ message: 'Correo Electronico Invalido' }),
    })
    .safeParse({ email })
  if (validacion.success) {
    try {
      const response = (await executeQuery(
        'select id, role from usuarios where email = ?',
        [email],
      )) as RowDataPacket
      if (response && response.length > 0) {
        return {
          message: 'success',
          id: response[0].id,
          role: response[0].role,
        }
      }
      const createResponse: { message: string; id: number } = await createUser(
        email,
      )
      if (createResponse.message === 'success') {
        return {
          message: 'success',
          id: createResponse.id,
          role: 'user-1',
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

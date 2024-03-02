'use server'

import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'
import { z } from 'zod'

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

  if (result.success) {
    try {
      const response = (await executeQuery(
        'insert into consultas values (NULL, ?, ?, ?)',
        [fullname, email, consult],
      )) as RowDataPacket

      if (response && response?.affectedRows) {
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

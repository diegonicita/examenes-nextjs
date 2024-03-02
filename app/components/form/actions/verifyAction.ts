'use server'

import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'
import { z } from 'zod'

export const verifyAction = async (formData: FormData) => {
  const email = formData.get('email')
  const code = formData.get('code')

  const uuidSchema = z
    .string()
    .refine(
      (value) =>
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          value,
        ),
      {
        message: 'Debe ser un UUID válido',
      },
    )

  try {
    uuidSchema.parse(code)
    try {
      const responseSelect = (await executeQuery(
        'SELECT code, verify FROM usuarios WHERE email = ?',
        [email],
      )) as RowDataPacket

      if (responseSelect && responseSelect[0].verify)
       {        
        return {
          isError: true,
          message: 'user verified',
        }}

      if (responseSelect)
        if (!responseSelect[0].verify && responseSelect[0].code === code) {
          try {
            const responseUpdate = (await executeQuery(
              'UPDATE usuarios SET verify = 1 WHERE email = ?',
              [email],
            )) as RowDataPacket
            if (responseUpdate && responseUpdate?.affectedRows) {
              return {
                isError: false,
                message: 'success',
              }
            }
          } catch (error) {
            return {
              isError: true,
              message: 'errors',
            }
          }
        }
    } catch (error) {
      return {
        isError: true,
        message: 'errors',
      }
    }
  } catch (error) {
    console.error('No es un UUID válido')
    return {
      isError: true,
      message: 'errors',
    }
  }
}

'use server'

import { revalidatePath } from 'next/cache'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { ConsultType } from '@/app/models/Consult'
import { RowDataPacket } from 'mysql2'
import { z } from 'zod'

export const insertAction = async (
  prevState: ConsultType,
  formData: FormData,
) => {
  const fullname = formData.get('fullname')
  const email = formData.get('email')
  const consult = formData.get('consult')

  const validationResult = z.object({
    fullname: z.string().min(3, { message: 'Debes ingresar al menos 3 caracteres' }),
    email: z.string().email({ message: 'Correo Electronico Invalido' }),
    consult: z.string().min(5, { message: 'Debes ingresar al menos 5 caracteres' }),
  }).safeParse({
    fullname,
    email,
    consult,
  }) 

  if (validationResult.success) {
    const result = (await executeQuery(
      'insert into consultas values (NULL, ?, ?, ?)',
      [fullname, email, consult],
    )) as RowDataPacket

    if (result && result?.affectedRows) {
      revalidatePath('/')
      return {
        email,
        fullname,
        clickNumber: prevState.clickNumber + 1,
        message: JSON.stringify(validationResult),
      }
    } else {
      revalidatePath('/')
      return {
        email,
        fullname,
        clickNumber: prevState.clickNumber + 1,
        message: JSON.stringify(validationResult),
      }
    }
  } else {
    revalidatePath('/')
    const errors = []
    if (email === '') errors.push('Correo')
    if (fullname === '') errors.push('Nombre')
    if (consult === '') errors.push('Mensaje')

    return {
      email,
      fullname,
      clickNumber: prevState.clickNumber + 1,
      message:
        JSON.stringify(validationResult),
    }
  }
}

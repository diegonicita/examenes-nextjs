'use server'

import { revalidatePath } from 'next/cache'
import executeQuery from '../helpers/mysqldb'
import { StateType } from '@/app/models/consult.type'
import { RowDataPacket } from 'mysql2'

export const insertAction = async (
  prevState: StateType,
  formData: FormData,
) => {
  const fullname = formData.get('fullname')
  const email = formData.get('email')
  const consult = formData.get('consult')

  if (fullname !== '' && email !== '' && consult !== '') {
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
        message: 'Nueva consulta creada exitosamente!',
      }
    } else {
      revalidatePath('/')
      return {
        email,
        fullname,
        clickNumber: prevState.clickNumber + 1,
        message: 'Houston, tenemos un problema...',
      }
    }
  } else {
    revalidatePath('/')
    return {
      email,
      fullname,
      clickNumber: prevState.clickNumber + 1,
      message: 'Los campos no pueden estar vacios!',
    }
  }
}

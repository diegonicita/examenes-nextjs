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
        message: 'Tu consulta fue enviada exitosamente!',
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
    const errors = []
    if (email === '') errors.push('Correo')
    if (fullname === '') errors.push('Nombre')
    if (consult === '') errors.push('Mensaje')

    return {
      email,
      fullname,
      clickNumber: prevState.clickNumber + 1,
      message:
        `${errors.join(' y ')}` +
        `${errors.length > 1 ? ' estan vacios!' : ' esta vacio!'}`,
    }
  }
}

'use server'

import { revalidatePath } from 'next/cache'
import executeQuery from '../../../server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'
import { StateType } from '@/app/models/consult.type'

export const insertAction = async (
  prevState: StateType,
  formData: FormData,
) => {
  const title = formData.get('title')
  const description = formData.get('description')
  const price = formData.get('price')

  const result = (await executeQuery(
    "insert into productos values (NULL,?,'1900-01-01 00:00:00',NULL,?,1,?,10,'img-cafetera-moulinex.jpg',1)",
    [title, description, price],
  )) as RowDataPacket

  if (result?.affectedRows) {
    revalidatePath('/products-server')
    return { message: 'Nuevo Producto Creado Exitosamente...' }
  }
}

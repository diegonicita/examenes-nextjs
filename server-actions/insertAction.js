'use server'

import { revalidatePath } from 'next/cache'
import executeQuery from './mysqldb'

export const insertAction = async (prevState, formData) => {
  const title = formData.get('title')
  const description = formData.get('description')
  const price = formData.get('price')
  const buttonName = formData.get('submit')

  const result = await executeQuery(
    "insert into productos values (NULL,?,'1900-01-01 00:00:00',NULL,?,1,?,10,'img-cafetera-moulinex.jpg',1)",
  [title, description, price])

  if (result?.affectedRows) {
    revalidatePath('/products-server')
    return { message: 'Nuevo Producto Creado Exitosamente...' }
  }
}

'use server'

import { revalidatePath } from 'next/cache'
import executeQuery from './mysqldb'

export const insertAction = async (prevState, formData) => {
  const title = formData.get('title')
  const description = formData.get('description')
  const price = formData.get('price')
  const buttonName = formData.get('submit')

  const result = await executeQuery(
    "insert into productos values (NULL,'Cafetera Moulinex','1900-01-01 00:00:00',NULL,NULL,1,1000,10,'img-cafetera-moulinex.jpg',1)",
  )

  if (result.affectedRows) {
    revalidatePath('/products-server')
    return { message: 'Producto insertado' }
  }
}

'use server'

import { revalidatePath } from 'next/cache'
import executeQuery from './mysqldb'

export const deleteAction = async (prevState, formData) => {
  const id = formData.get('id')
  console.log(id)
  if (id) {
    const result = await executeQuery('delete from productos where id=?', [id])

    if (result?.affectedRows) {
      revalidatePath('/products-server')
      return { message: 'Nuevo Producto Creado Exitosamente...' }
    }
  }
}

'use server'

import { revalidatePath } from 'next/cache'
import executeQuery from '../../../server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'
import { StateType } from '@/app/models/consult.type'

export const deleteAction = async (
  prevState: StateType,
  formData: FormData,
) => {
  const id = formData.get('id')
  console.log(id)
  if (id) {
    const result = (await executeQuery('delete from productos where id=?', [
      id,
    ])) as RowDataPacket

    if (result?.affectedRows) {
      revalidatePath('/products-server')
      return { message: 'Nuevo Producto Creado Exitosamente...' }
    }
  }
}

'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'
import { type ConsultType } from '@/app/models/Consult'

export const deleteAction = async (
  prevState: ConsultType,
  formData: FormData,
) => {
  const id = formData.get('id')
  if (id) {
    const result = (await executeQuery('delete from consultas where id=?', [
      id,
    ])) as RowDataPacket

    if (result?.affectedRows) {
      return { message: 'success' }
    }
  }
}

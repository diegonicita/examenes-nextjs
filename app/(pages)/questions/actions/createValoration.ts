'use server'

import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { ConsultType } from '@/app/models/Consult'
import { RowDataPacket } from 'mysql2'
import { refreshAction } from '@/app/(pages)/questions/actions/refreshAction'

export const createValoration = async (
  prevState: ConsultType,
  formData: FormData,
) => {
  const valor1 = formData.get('like') === 'true' ? true : false
  const valor2 = formData.get('unlike') === 'true' ? true : false
  const valor3 = formData.get('love') === 'true' ? true : false
  const id = formData.get('id')

  let binario =
    ((valor1 ? 1 : 0) << 2) | ((valor2 ? 1 : 0) << 1) | (valor3 ? 1 : 0)

  const result = (await executeQuery(
    'insert into valoraciones (id, id_user, value) Values(?,?,?) on duplicate key update value=?',
    [id, 1, binario, binario],
  )) as RowDataPacket

  const formData2 = new FormData()
  formData.append('auth', 'false')
  refreshAction(formData2)
}
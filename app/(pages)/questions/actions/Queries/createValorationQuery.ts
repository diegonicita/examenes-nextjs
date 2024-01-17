'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'

type CreateValoration = {
  id: FormDataEntryValue
  userId: number
  byte: number
}

export default async function createValorationQuery({
  id,
  userId,
  byte,
}: CreateValoration) {
  const queryString =
    'insert into valoraciones (id, id_user, value) Values(?,?,?)' +
    ' on duplicate key update value=?'
  const {} = (await executeQuery(queryString, [
    id,
    userId,
    byte,
    byte,
  ])) as RowDataPacket
}

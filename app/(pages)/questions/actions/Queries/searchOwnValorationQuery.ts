'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'

type SearchValoration = {
  questionId: number
  userId: number
}

export default async function searchOwnValorationQuery({
  questionId,
  userId,
}: SearchValoration) {
  const queryString = `SELECT * FROM valoraciones WHERE id_user=? AND id=?`
  const result = (await executeQuery(queryString, [
    questionId,
    userId,
  ])) as RowDataPacket

  return result
}

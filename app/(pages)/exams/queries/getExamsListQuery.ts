'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import type { RowDataPacket } from 'mysql2'

export default async function getExamsTypesQuery(id: string) {
  try {
    const queryString1 = 'SELECT * FROM exams WHERE exam_type_id = ?'
    const result = (await executeQuery(queryString1, [id])) as RowDataPacket
    return result
  } catch (error) {
    console.log(error)
  }
}

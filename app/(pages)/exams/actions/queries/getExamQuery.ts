'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'

export default async function getExamQuery(
  examId: number,
  year: number,
  limit: number,
  page: number
) {
  const offset = (page - 1) * limit
  const queryString1 = `SELECT * FROM preguntas WHERE examen = ? AND ano = ? ORDER BY numero LIMIT ? OFFSET ?`
  const result = (await executeQuery(queryString1, [
    examId.toString(),
    year.toString(),
    limit.toString(),
    offset.toString()
  ])) as RowDataPacket
  return result
}

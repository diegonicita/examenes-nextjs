'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'

export default async function getExamQuery(
  examId: number,
  year: number,
  limit: number,
) {
  const queryString1 = `SELECT * FROM preguntas WHERE examen = ? and ano =? limit ?`
  const result = (await executeQuery(queryString1, [
    examId,
    year,
    limit,
  ])) as RowDataPacket
  return result
}

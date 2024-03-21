'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import type { RowDataPacket } from 'mysql2'

export default async function getExamBySubjectQuery(
  examId: number,
  subjectId: number,
  limit: number,
) {
  console.log(subjectId)
  const queryString1 =
    'SELECT * FROM preguntas WHERE examen = ? AND (clasifica1 = ? OR clasifica2 = ? OR clasifica3 = ? OR clasifica4 = ? OR clasifica5 = ?) LIMIT ?'
  const result = (await executeQuery(queryString1, [
    examId.toString(),
    subjectId.toString(),
    subjectId.toString(),
    subjectId.toString(),
    subjectId.toString(),
    subjectId.toString(),
    limit.toString(),
  ])) as RowDataPacket
  return result
}

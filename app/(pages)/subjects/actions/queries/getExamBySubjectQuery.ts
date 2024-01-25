'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'

export default async function getExamBySubjectQuery(
  examId: number,
  subjectId: number,
  limit: number,
) {
  const queryString1 =
    'SELECT * FROM preguntas WHERE examen = ? AND (clasifica1 = ? OR clasifica2 = ? OR clasifica3 = ? OR clasifica4 = ? OR clasifica5 = ?) LIMIT ?'
  const result = (await executeQuery(queryString1, [
    examId,
    subjectId,
    subjectId,
    subjectId,
    subjectId,
    subjectId,
    limit,
  ])) as RowDataPacket
  return result
}

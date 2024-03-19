'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'

export default async function getExamsTypesQuery() {
  try {
    const queryString1 = `select * from exams_types`
    const result = (await executeQuery(queryString1, [])) as RowDataPacket
    return result
  } catch (error) {
    console.log(error)
  }
}

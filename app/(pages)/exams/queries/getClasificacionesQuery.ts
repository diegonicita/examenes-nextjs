'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import type { RowDataPacket } from 'mysql2'

export default async function getClasificacionesQuery() {
  try {
    const queryString1 = 'select * from clasificaciones'
    const result = (await executeQuery(queryString1, [])) as RowDataPacket
    return result
  } catch (error) {
    console.log(error)
  }
}

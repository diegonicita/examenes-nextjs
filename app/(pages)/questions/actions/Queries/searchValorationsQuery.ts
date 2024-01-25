'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'

const searchItems = async (ids: number[]) => {
  let result = {} as any
  if (Array.isArray(ids) === false) return result
  for (const id of ids) {
    const queryString = `
      SELECT possible_values.value AS value, COUNT(valoraciones.id) AS cantidad
      FROM (
          SELECT 1 AS value
          UNION
          SELECT 2 AS value
          UNION
          SELECT 4 AS value
          ) AS possible_values
      LEFT JOIN valoraciones ON possible_values.value = valoraciones.value AND valoraciones.id = ?
      GROUP BY possible_values.value;`
    result[id] = {
      ...((await executeQuery(queryString, [id])) as RowDataPacket),
    }
  }
  return result
}

const searchValorationsQuery = async (ids: number[]) => {
  const res = await searchItems(ids)
  return res
}

export default searchValorationsQuery

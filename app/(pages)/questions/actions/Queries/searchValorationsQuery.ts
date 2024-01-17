'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'

const searchValorationsQuery = async (ids: number[]) => {
  const valorations = {} as any
  if (ids) {
    ids.forEach(async (id: number) => {
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
      let result = (await executeQuery(queryString, [id])) as RowDataPacket
      valorations[id] = { ...result }
    })
    return valorations
  } else return null
}

export default searchValorationsQuery

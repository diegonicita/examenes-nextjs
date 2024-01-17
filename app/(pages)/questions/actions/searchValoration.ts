'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'

const searchValorations = async (results: RowDataPacket | undefined) => {
  const ids = results?.map((r: { id: any }) => r.id)
  const valorations = {} as any

  await ids?.forEach(async (id: number) => {
    const queryString2 = `SELECT possible_values.value AS value, COUNT(valoraciones.id) AS cantidad
FROM (
    SELECT 1 AS value
    UNION
    SELECT 2 AS value
    UNION
    SELECT 4 AS value
) AS possible_values
LEFT JOIN valoraciones ON possible_values.value = valoraciones.value AND valoraciones.id = ?
GROUP BY possible_values.value;`
    let result = (await executeQuery(queryString2, [id])) as RowDataPacket
    valorations[id] = { ...result }
    console.log(valorations[id])
  })

  return valorations
}

export default searchValorations

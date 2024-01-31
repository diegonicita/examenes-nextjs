'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'

export default async function searchQuestionsQuery(
  queries: string[],
  limit: number,
) {
  // Filtra las consultas que tienen al menos 3 caracteres
  const validQueries = queries.filter((q) => q.length > 2)

  let resultQueryLimit10

  if (validQueries.length > 0) {
    // Crea un array de condiciones para la búsqueda en todos los campos
    const conditions = validQueries
      .map(
        () =>
          '(texto LIKE ? OR opcion1 LIKE ? OR opcion2 LIKE ? OR opcion3 LIKE ? OR opcion4 LIKE ? OR opcion5 LIKE ?)',
      )
      .join(' AND ')

    // Concatena '%' a cada consulta para formar el array de valores
    const queryLikes = validQueries.flatMap((q) =>
      Array.from({ length: 6 }, () => `%${q}%`),
    )
    // Add Limit
    queryLikes.push(limit.toString())

    // Construye y ejecuta la consulta
    const queryString1 = `SELECT * FROM preguntas WHERE ${conditions} LIMIT ?`
    resultQueryLimit10 = (await executeQuery(
      queryString1,
      queryLikes,
    )) as RowDataPacket
  }
  return resultQueryLimit10
}

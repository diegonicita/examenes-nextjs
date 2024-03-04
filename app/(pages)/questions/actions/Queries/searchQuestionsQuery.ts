'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'

export default async function searchQuestionsQuery(
  queries: string[],
  limit: number,
  page:number
) {
  // Filtra las consultas que tienen al menos 3 caracteres
  const validQueries = queries.filter((q) => q.length > 2)
  const offset = (page - 1) * limit

  let resultQueryLimit10
  let resultLength

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
    const finalQueryLikes = [...queryLikes, limit.toString(),offset.toString()]

    // Construye y ejecuta la consulta
    const queryString1 = `SELECT * FROM preguntas WHERE ${conditions} LIMIT ? OFFSET ?`
    resultQueryLimit10 = (await executeQuery(
      queryString1,
      finalQueryLikes,
    )) as RowDataPacket

    const countQueryString = `SELECT COUNT(*) as count FROM preguntas WHERE ${conditions}`
    resultLength = (await executeQuery(
      countQueryString,
      queryLikes,
    )) as RowDataPacket

    console.log(resultLength[0].count)
  }

  return {
    resultQueryLimit10,
    resultLength: Array.isArray(resultLength) ? resultLength[0].count : null,
  }
}

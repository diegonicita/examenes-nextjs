'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'
import { excludedWords } from '@/app/(pages)/questions/components/words/excludedWords'
import { cleanWord } from '@/app/(pages)/questions/components/words/cleanWord'

export default async function searchQuestions(queries: string[]) {
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

    // Construye y ejecuta la consulta
    const queryString1 = `SELECT * FROM preguntas WHERE ${conditions} limit 10`
    resultQueryLimit10 = (await executeQuery(
      queryString1,
      queryLikes,
    )) as RowDataPacket
  }

  return resultQueryLimit10
}

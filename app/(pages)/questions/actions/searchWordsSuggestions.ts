'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'
import { excludedWords } from '@/app/(pages)/questions/components/searchbar/excludedWords'
import { cleanWord } from '@/app/(pages)/questions/components/searchbar/cleanWord'

export default async function searchWords(queries: string[]) {
  // Filtra las consultas que tienen al menos 3 caracteres
  const validQueries = queries.filter((q) => q.length > 2)
  let resultQueryNoLimits
  const conteoPalabras = {} as any
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
    const queryString2 = `SELECT * FROM preguntas WHERE ${conditions}`
    resultQueryNoLimits = (await executeQuery(
      queryString2,
      queryLikes,
    )) as RowDataPacket
  }

  // Función para contar palabras en un texto y actualizar el conteo global
  const countWords = (texto: string) => {
    if (typeof texto === 'string') {
      const palabrasSinFiltrar = texto.split(/\s+/)
      const palabras = palabrasSinFiltrar.filter(
        (palabra) => palabra.length > 3,
      )

      // Itera sobre cada palabra y realiza el conteo
      palabras.forEach((palabra: string) => {
        const palabraLimpia = cleanWord(palabra)

        if (
          !queries.includes(palabraLimpia.toLowerCase()) &&
          !excludedWords.includes(palabraLimpia.toLowerCase()) &&
          !/\d/.test(palabraLimpia)
        ) {
          // Convierte la palabra a minúsculas para evitar contar palabras con diferente capitalización como diferentes
          const palabraLowerCase = palabraLimpia.toLowerCase()
          // Incrementa el conteo de la palabra en el objeto
          conteoPalabras[palabraLowerCase] =
            (conteoPalabras[palabraLowerCase] || 0) + 1
        }
      })
    }
  }

  resultQueryNoLimits &&
    resultQueryNoLimits.map((item: any, index: number) =>
      countWords(item.texto),
    )

  // Convertir las cantidades a números y ordenar de mayor a menor
  const palabrasOrdenadas = Object.entries(conteoPalabras)
    .map(([palabra, cantidad]) => ({ palabra, cantidad }))
    .sort((a: any, b: any) => b.cantidad - a.cantidad)

  const palabrasOrdenadas20 = palabrasOrdenadas.slice(0, 5)

  return palabrasOrdenadas20
}

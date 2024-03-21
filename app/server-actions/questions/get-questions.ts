'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import type { RowDataPacket } from 'mysql2'
import getInfoAuthCookie from '../helpers/getInfoAuthCookie'

export default async function getQuestions(query: string | null) {
  const auth = await getInfoAuthCookie()

  console.log(query)
  if (auth && auth.role === 'admin') {
    const querylike = `%${query}%`
    let result = null
    result = (await executeQuery(
      'select * from preguntas where texto like ? limit 10',
      [querylike],
    )) as RowDataPacket

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const r = result.map((item: any) => {
      return {
        id: item.id,
        texto: item.texto,
        opcion1: item.opcion1,
        opcion2: item.opcion2,
        opcion3: item.opcion3,
        opcion4: item.opcion4,
      }
    })
    return r
  }
  return undefined
}

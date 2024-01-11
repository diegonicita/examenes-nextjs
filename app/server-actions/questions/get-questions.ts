'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'
import getRole from '@/app/server-actions/helpers/getRole'
import { cookies } from 'next/headers'

export default async function getQuestions(query: string | null) {
  const auth = cookies().get('auth')
  const role = (await getRole(auth)) as string
  console.log(query)
  if (role === 'admin') {
    const querylike = '%' + query + '%'
    let result = null
    result = (await executeQuery('select * from preguntas where texto like ? limit 10', [
      querylike,
    ])) as RowDataPacket
    
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

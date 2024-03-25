import executeQuery from '@/app/server-actions/helpers/mysqldb'
import type { RowDataPacket } from 'mysql2'

export default async function dataNews() {
  try {
    const data = (await executeQuery(
      'SELECT id, title, description, url_news, url_image, created_at FROM news',
    )) as RowDataPacket
    return data
  } catch (e) {
    console.log('error', e)
    return { message: 'error recovering data' }
  }
}

import executeQuery from '@/app/server-actions/helpers/mysqldb'
import type { RowDataPacket } from 'mysql2'

export default async function updateCodeAvailable(id: number) {
  const resultUpdate = (await executeQuery(
    'UPDATE codes SET available = 0 WHERE id = ?;',
    [id],
  )) as RowDataPacket

  if (resultUpdate.affectedRows === 0) {
    return { message: 'error' }
  }
  return { message: 'success' }
}

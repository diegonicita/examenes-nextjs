import executeQuery from '@/app/server-actions/helpers/mysqldb'
import type { RowDataPacket } from 'mysql2'

export default async function getCodeId(code: string) {
  const result = (await executeQuery(
    'SELECT id FROM codes WHERE code = ? AND available = 1;',
    [code],
  )) as RowDataPacket

  if (result.length === 0) {
    console.log('codigo no encontrado o ya usado previamente')
    return false
  }
  // Devolvemos el resultado de la actualización
  return result[0].id
}

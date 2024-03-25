import executeQuery from '@/app/server-actions/helpers/mysqldb'
import type { RowDataPacket } from 'mysql2'

export default async function updateUserRole(email: string) {
  // Consulta para obtener el rol del usuario
  const resultUsuario = (await executeQuery(
    'SELECT role FROM usuarios WHERE email = ?;',
    [email],
  )) as RowDataPacket

  // Si no se encuentra el usuario, devolvemos un error
  if (resultUsuario.length === 0) {
    return { message: 'error' }
  }

  // Obtenemos el rol actual del usuario
  const rolActual = resultUsuario[0].role

  // Si el rol actual no es "user-1", no hacemos nada
  if (rolActual !== 'user-1') {
    return { message: 'error' }
  }

  // Consulta para actualizar el rol del usuario
  const resultUpdate = (await executeQuery(
    'UPDATE usuarios SET role = ? WHERE email = ?;',
    ['user-2', email],
  )) as RowDataPacket

  // Si la actualización no se realiza correctamente, devolvemos un error
  if (resultUpdate.affectedRows === 0) {
    return { message: 'error' }
  }

  // Devolvemos el resultado de la actualización
  return { message: 'success' }
}

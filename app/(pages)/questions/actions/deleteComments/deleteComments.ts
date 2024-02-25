'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import { RowDataPacket } from 'mysql2'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { UserType } from '@/app/models/User'
import { auth } from '@clerk/nextjs'

const schema = z.object({
  id: z.string(),
})
export default async function DeleteComment(
  prevState: { message: string },
  formData: FormData,
) {
  const validateFields = schema.safeParse({
    id: formData.get('id'),
  })
  console.log(validateFields)
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    }
  }
  try {
    // Obtener información del comentario
    const commentInfo = (await executeQuery(
      'SELECT id_user FROM comments WHERE id = ?',
      [validateFields.data.id],
    )) as RowDataPacket[]
    const commentUserId = commentInfo[0].id_user
    // Obtener informacion del usuario
    const { userId } = auth()
    const currentUser = await getInfoAuthCookie(userId)
    const role = currentUser?.role
    const id = currentUser?.id
    // Comparar su role
    // Comparar id de usuario con el id del comentario
    if (role === 'user' && commentUserId !== id) {
      console.log('Unauthorized')
      return { message: 'unauthorized' }
    }
    // Delete comments from the main table based on the condition
    await executeQuery('DELETE FROM comments WHERE id = ?', [
      validateFields.data.id,
    ])
    revalidatePath('/')
    console.log('success')
    return { message: 'success' }
  } catch (e) {
    return { message: 'error' }
  }
}

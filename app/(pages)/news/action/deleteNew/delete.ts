'use server'
import type { UserType } from '@/app/models/User'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import type { RowDataPacket } from 'mysql2'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
  id: z.string(),
})
export default async function deleteNew(
  prevState: { message: string },
  formData: FormData,
) {
  console.log('deleteNew function called with formData:', formData)
  const validateFields = schema.safeParse({
    id: formData.get('id'),
  })
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    }
  }
  console.log(validateFields.data.id, 'id')
  try {
    const currentUser = (await getInfoAuthCookie()) as UserType
    if (currentUser.role === 'admin') {
      console.log(validateFields.data.id, 'id')
      const deleteComment = (await executeQuery(
        'delete from news where id =?',
        [validateFields.data.id],
      )) as RowDataPacket
      if (deleteComment && deleteComment.affectedRows > 0) {
        revalidatePath('/news')
        return { message: 'success' }
      }
    }
    return { message: 'error' }
  } catch (e) {
    return { message: 'error' }
  }
}

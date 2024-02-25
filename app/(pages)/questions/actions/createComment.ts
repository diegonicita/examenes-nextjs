'use server'
import { RowDataPacket } from 'mysql2'
import { revalidatePath } from 'next/cache'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import { UserType } from '@/app/models/User'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { z } from 'zod'
import { auth } from '@clerk/nextjs'

const schema = z.object({
  comment: z
    .string({ invalid_type_error: 'el comentario tiene que ser un string' })
    .min(2, { message: 'debe contener al meenos una palabra' })
    .trim(),
  id_question: z.string(),
  id_parent_comment: z.string(),
})
export default async function createReply(prevState: any, formData: FormData) {
  const newTodo = {
    comment: formData?.get('comment'),
    id_question: formData?.get('id_question'),
    id_parent_comment: formData?.get('id_parent_comment'),
  }

  const validatedFields = schema.safeParse(newTodo)
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  if (validatedFields.data.comment) {
    try {
      const { userId } = auth()
      const authData = await getInfoAuthCookie(userId)
      console.log(authData, 'Imprime datos del usuario')
      if (authData && authData.id) {
        console.log('Existe id: crear comentario')
        const result = (await executeQuery(
          'insert into comments values (NULL,?,?,?,?,?,NOW())',
          [
            validatedFields.data.id_question.toString(),
            authData.id,
            validatedFields.data.comment,
            validatedFields.data.id_parent_comment !== 'nula'
              ? validatedFields.data.id_parent_comment.toString()
              : null,
            authData?.username || null,
          ],
        )) as RowDataPacket
        if (result && result?.affectedRows) {
          console.log('success')
          revalidatePath('/questions')
          return { message: 'success' }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}

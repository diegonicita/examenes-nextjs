'use server'
import type { RowDataPacket } from 'mysql2'
import { revalidatePath } from 'next/cache'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import type { UserType } from '@/app/models/User'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { z } from 'zod'

const schema = z.object({
  comment: z
    .string({ invalid_type_error: 'el comentario tiene que ser un string' })
    .min(2, { message: 'debe contener al meenos una palabra' })
    .trim(),
  id_question: z.string(),
  id_parent_comment: z.string(),
})
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default async function createReply(prevState: any, formData: FormData) {
  const newTodo = {
    comment: formData?.get('comment'),
    id_question: formData?.get('id_question'),
    id_parent_comment: formData?.get('id_parent_comment'),
  }

  const validatedFields = schema.safeParse(newTodo)
  const authData = (await getInfoAuthCookie()) as UserType

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  if (validatedFields.data.comment) {
    // await new Promise((res) => setTimeout(res, 1000))
    console.log(validatedFields.data.comment)
    const result = (await executeQuery(
      'insert into comments values (NULL,?,?,?,?,?,NOW())',
      [
        validatedFields.data.id_question,
        authData?.id,
        validatedFields.data.comment,
        validatedFields.data.id_parent_comment !== 'nula'
          ? validatedFields.data.id_parent_comment
          : null,
        authData?.username,
      ],
    )) as RowDataPacket
    if (result?.affectedRows) {
      revalidatePath('/questions')
      return { message: 'success' }
    }
  }
}

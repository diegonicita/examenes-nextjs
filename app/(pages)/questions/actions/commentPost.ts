'use server'

// import { z } from 'zod'
 import executeQuery from '@/app/server-actions/helpers/mysqldb'
// import { RowDataPacket } from 'mysql2'
// import { revalidatePath } from 'next/cache'
// import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
// import { UserType } from '@/app/models/User'

// const schema = z.object({
//   comment: z
//     .string({ invalid_type_error: 'el comentario tiene que ser un string' })
//     .min(2, { message: 'debe contener al meenos una palabra' })
//     .trim(),
//     id_question: z.number()
// })
// export default async function createComment(newTodo: unknown) {
//   console.log(newTodo,"id_question")
//   const validatedFields = schema.safeParse(newTodo)
//   const authData = (await getInfoAuthCookie()) as UserType
//   console.log(validatedFields)

//   // Return early if the form data is invalid
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     }
//   }
//   if (validatedFields.data.comment) {
//     await new Promise((res) => setTimeout(res, 1000));
//     console.log(validatedFields.data.comment)
//     const result = (await executeQuery(
//     'insert into comments value (NULL,?,?,?,?)',
//       [validatedFields.data.id_question, authData?.id, validatedFields.data.comment,null],
//     )) as RowDataPacket
//     if (result) {
//       // revalidatePath("/")
//       return { message: 'success' }
//     }
//   }
// }

export async function getUserComments() {
  const result = await executeQuery(
    'SELECT id, id_question, id_user, comment_text, id_parent_comment FROM comments',
  )
  console.log(result)
  return result
}

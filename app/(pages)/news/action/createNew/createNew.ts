'use server'
import type { RowDataPacket } from 'mysql2'
import { revalidatePath } from 'next/cache'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import type { UserType } from '@/app/models/User'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { z } from 'zod'

const schema = z.object({
  title: z
    .string({ invalid_type_error: 'el comentario debe ser un string' })
    .trim(),
  description: z.string(),
  url_news: z.string(),
  url_image: z.string(),
})
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default async function createNews(prevState: any, formData: FormData) {
  const newTodo = {
    title: formData?.get('title'),
    description: formData?.get('description'),
    url_news: formData?.get('url_news'),
    url_image: formData?.get('url_image'),
  }

  const validatedFields = schema.safeParse(newTodo)
  const authData = (await getInfoAuthCookie()) as UserType
  console.log(authData)

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  try {
    if (authData.role === 'admin') {
      if (validatedFields.data) {
        // await new Promise((res) => setTimeout(res, 1000))
        console.log(validatedFields.data)
        const result = (await executeQuery(
          'insert into news values (NULL,?,?,?,?,NOW())',
          [
            validatedFields.data.title,
            validatedFields.data.description,
            validatedFields.data.url_news,
            validatedFields.data.url_image,
          ],
        )) as RowDataPacket
        if (result?.affectedRows) {
          revalidatePath('/news')
          return { message: 'success' }
        }
      }
    }
  } catch (e) {
    return { message: 'error' }
  }
}

"use server"

import { z } from "zod";
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from "mysql2";
import { revalidatePath } from "next/cache";

const schema = z.object({
    comment: z
      .string({ invalid_type_error: "el comentario tiene que ser un string" })
      .min(2, { message: "debe contener al meenos una palabra" })
      .trim()
  });
  export default async function createComment(newTodo:unknown) {
    
    const validatedFields = schema.safeParse(
      newTodo
    )
    console.log(validatedFields)

   
    // Return early if the form data is invalid
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }
    if (validatedFields.data.comment) {
        const result = (await executeQuery('insert into comments value (NULL,?,?,?,?)', [
          1,1,validatedFields.data.comment,1
        ])) as RowDataPacket
        console.log(result)
        console.log(validatedFields.data.comment)
    }
    
  }

  export async function getUserComments (){
    const result = (await executeQuery('SELECT id, id_question, id_user, comment_text, id_parent_comment FROM comments'))
    revalidatePath("/questions")
  return result
    
  

  }
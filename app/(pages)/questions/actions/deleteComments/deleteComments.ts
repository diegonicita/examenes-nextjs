"use server";
import executeQuery from "@/app/server-actions/helpers/mysqldb";
import getInfoAuthCookie from "@/app/server-actions/helpers/getInfoAuthCookie";
import { RowDataPacket } from "mysql2";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { UserType } from "@/app/models/User";

const schema = z.object({
  id: z.string(),
});
export default async function DeleteComment(
  prevState: { message: string },
  formData: FormData
) {
  const validateFields = schema.safeParse({
    id: formData.get("id"),
  });
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }
  try {
    // Obtener información del comentario
    const commentInfo = (await executeQuery(
      "SELECT id_user FROM comments WHERE id = ?",
      [validateFields.data.id]
    )) as RowDataPacket[];
    const commentUserId = commentInfo[0].id_user;
    // Obtener informacion del usuario
    const currentUser = (await getInfoAuthCookie()) as UserType;
    const role = currentUser.role;
    const userId = currentUser.id;
    // Comparar su role
    // Comparar id de usuario con el id del comentario
    if (role === "user" && commentUserId !== userId) {
      console.log("Unauthorized");
      return { message: "unauthorized" };
    }
    // Delete comments from the main table based on the condition
    const deleteComment = (await executeQuery(
      "DELETE FROM comments WHERE id = ?",
      [validateFields.data.id]
    )) as RowDataPacket;
    if (deleteComment && deleteComment.affectedRows > 0) {
      
      return { message: "success" };
    } else {
      return { message: "error" };
    }
     
  } catch (e) {
    return { message: "error" };
  }
  
}

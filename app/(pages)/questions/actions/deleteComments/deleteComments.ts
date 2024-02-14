"use server";
import executeQuery from "@/app/server-actions/helpers/mysqldb";
import { RowDataPacket } from "mysql2";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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
  console.log(validateFields);
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }
  try {
    // Delete comments from the main table based on the condition
    (await executeQuery(
      "DELETE FROM comments WHERE id = ?",
      [validateFields.data.id]
    )) as RowDataPacket;
    revalidatePath("/questions");
    console.log(prevState.message)
    return { message: "success" };
  } catch (e) {
    return { message: "error" };
  }
}

"use server";
import executeQuery from "@/app/server-actions/helpers/mysqldb";
import { RowDataPacket } from "mysql2";
import { revalidatePath } from "next/cache";
import { z } from "zod";
const schema = z.object({
  id: z.string(),
  report: z.string().min(1),
});
export default async function reportComment(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const validateFields = schema.safeParse({
    id: formData.get("id"),
    report: formData.get("report"),
  });
  console.log(validateFields);
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }
  try {
    // Step 1: Select data from comments
    const commentData = await executeQuery(
      "SELECT id, id_user FROM comments WHERE id = ?",
      [validateFields.data.id]
    )as RowDataPacket
    console.log(commentData[0].id)

    // Step 2: Insert data into reportcoments
    if (commentData && commentData.length > 0) {
        // Step 2: Insert data into reportcomments
        await executeQuery(
          "INSERT INTO reportcomments (id_user, id, reporting_comments) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE reporting_comments = ?",
          [commentData[0]?.id_user, commentData[0].id, validateFields.data.report,validateFields.data.report]
        ) 
        revalidatePath("/")
    } else {
        return { message: "No data found for the specified comment ID" };
    }
} catch (e) {
    return { message: "error reporting comment" };
}
}

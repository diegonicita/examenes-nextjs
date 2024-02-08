"use server"
import executeQuery from "@/app/server-actions/helpers/mysqldb";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
  comment_text: z.string(),
});
export default async function editCommenAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const validateFields = schema.safeParse({
    id: formData.get("id"),
    comment_text: formData.get("comment_text"),
  });
  console.log(validateFields);
  
  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }
  try {
    await executeQuery("update comments set comment_text = ? where id = ?", [
      validateFields.data.comment_text,
      validateFields.data.id,
    ]);
    console.log(validateFields.data);
    revalidatePath("/questions");
    return { message: "success" };
  } catch (e) {
    return { message: "error" };
  }
}

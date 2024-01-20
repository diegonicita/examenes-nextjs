"use client"
import { useState } from "react";
import { IconEmojiSmile } from "./icons";
import { z } from "zod";
//@ts-ignore
import { useFormStatus, useFormState } from 'react-dom'
import createComment from "../../actions/commentPost";


export default function CommentInput({
  handleEmoji,
  emojiPick,
  handleInputComment,
  children,
}: {
  handleEmoji: () => void;
  emojiPick: string | undefined;
  handleInputComment: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}) {
  const [errorClientSide, setErrorClientSide] = useState("")
  const schema = z.object({
    comment: z
      .string({ invalid_type_error: "el comentario tiene que ser un string" })
      .min(2, { message: "debe contener al meenos una palabra" })
      .trim()
  });

  const input = async (formData: FormData) => {

     const newTodo = {comment: formData.get("comment")}


     const result = schema.safeParse(newTodo)
     console.log(result)
     if(!result.success) {
      result.error.issues.forEach((issue) => {
        setErrorClientSide(issue.path[0] + ": " + issue.message + ". ")
        console.log(issue)
      })
    
      return
    } else {
      setErrorClientSide("")
    }
    console.log(result.data.comment)
   await createComment(result.data)
  };
  
  return (
    <div className=" flex-grow">
      <form action={input}>
        <div className="rounded-full border border-gray-300 relative p-2">
          <input
            type="text"
            value={emojiPick}
            placeholder="add a comment"
            className="focus:outline-none w-full "
            name="comment"
            onChange={handleInputComment}
          />
          
          <span
            className="absolute right-5 top-3 cursor-pointer"
            onClick={handleEmoji}
          >
            <IconEmojiSmile />
          </span>
        </div>
        <div className="">{children}</div>
        <label htmlFor="">{errorClientSide}</label>
      </form>
    </div>
  );
}

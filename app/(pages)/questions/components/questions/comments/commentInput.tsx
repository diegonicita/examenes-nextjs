"use client";
//@ts-ignore
import { useRef, useState, useOptimistic } from "react";
import { IconEmojiSmile } from "../icons";
import { z } from "zod";
//@ts-ignore
import createComment from "../../../actions/commentPost";
import useEmoji from "@/app/hooks/questions/comments/useEmoji";
import EmojiPicker from "emoji-picker-react";
import UserComments from "./userComments";


export default function CommentInput({ messages }: { messages?: any }) {
  const [errorClientSide, setErrorClientSide] = useState("");
  const schema = z.object({
    comment: z
      .string({ invalid_type_error: "el comentario tiene que ser un string" })
      .min(2, { message: "debe contener al meenos una palabra" })
      .trim(),
  });
  const {
    saveTextAndEmoji,
    handleInputComment,
    handleOpenEmoji,
    handleStopPropagation,
    openEmoji,
    handleCloseEmoji,
    handleSaveEmoji,
  } = useEmoji();
  const formRef = useRef<HTMLFormElement>(null);
 
  const input = async (formData: FormData) => {
    const newTodo = { comment: formData.get("comment") };
    const result = schema.safeParse(newTodo);
    console.log(result,"result")
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        setErrorClientSide(issue.path[0] + ": " + issue.message + ". ");
        console.log(issue,"issue");
      });

    } else {
      setErrorClientSide("");
      formRef?.current?.reset();
      
    }
 
addOptimisticMessage(
{
  id: 5,
  id_question: 1,
  id_user: 1,
  comment_text: result.data.comment,
  id_parent_comment: 1
});
console.log("After:", optimisticMessages);
   
   
    await createComment(result.data.comment);
  };
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => {
      return [...state, newMessage];
    }
  );
  
  console.log("After:", optimisticMessages);

  return (
    <div className=" flex-grow">
      <form action={input} ref={formRef}>
        <div className="rounded-full border border-gray-300 relative p-2">
          <input
            type="text"
            value={saveTextAndEmoji}
            placeholder="add a comment"
            className="focus:outline-none w-full "
            name="comment"
            onChange={handleInputComment}
          />

          <span
            className="absolute right-5 top-3 cursor-pointer"
            onClick={handleOpenEmoji}
          >
            <IconEmojiSmile />
          </span>
        </div>
        {saveTextAndEmoji && (
          <button className="btn-sm btn mt-2" type="submit">
            post
          </button>
        )}
        <label htmlFor="">{errorClientSide}</label>
      </form>
      <div onClick={handleCloseEmoji}>
        {openEmoji && (
          <div onClick={handleStopPropagation} className="w-[348px]">
            <EmojiPicker searchDisabled onEmojiClick={handleSaveEmoji} />
          </div>
        )}
      </div>
      {optimisticMessages?.map((message, index) => (
        <div key={index}>
          <UserComments data={message} />
          {!!message.sending && <small>(Sending...)</small>}
        </div>
      ))}
    </div>
  );
}

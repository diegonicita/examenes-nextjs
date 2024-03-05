
import {useEmojiContext} from "@/app/hooks/questions/comments/useEmoji";
//@ts-ignore
import { useFormStatus } from "react-dom";
import { IconEmojiSmile } from "../../valorations/icons";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import i18n from '@emoji-mart/data/i18n/es.json'

export function PickerComponent({id}:{id:number}) {
  
  const { openEmoji, handleCloseEmoji, handleSaveEmoji } = useEmojiContext();

  return (
    <div onClick={handleCloseEmoji} className="mt-2 pr-5 ">
      {openEmoji &&
          <Picker
            data={data}
            onEmojiSelect={(emoji: any) => handleSaveEmoji(id, emoji)}
            i18n={i18n}
            locale="es"
            emojiButtonSize={30}
            searchPosition="none"
            onClickOutside={handleCloseEmoji}
          />
}
    </div>
  );
}
export function ReplyInput({
  id,
  idParent,
}: {
  id: number;
  idParent: string | number;
}) {
  const { pending } = useFormStatus();
  const {
    saveTextAndEmoji,
    openEmoji,
    handleInputComment,
    handleOpenEmoji,
  } = useEmojiContext();
  return (
    <section className="flex flex-col ml-12 ">
      <div className="flex">
       
          <img
            alt="profile"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            className="w-10 h-10 rounded-full"
          />
        
        <div className="flex-grow">
        <div className=" relative ml-1 ">
          <input
            type="text"
            placeholder={"add a comment to msg " + id}
            className="p-2 w-full focus:outline-none rounded-full border border-gray-300 "
            name="comment"
            id="comment"
            value={saveTextAndEmoji[id] || ""}
            onChange={(e) => handleInputComment(id, e)}
          />

          <span
            className="absolute right-6 top-3 cursor-pointer"
            onClick={handleOpenEmoji}
          >
            <IconEmojiSmile />
          </span>
        </div>
      <div>
        {idParent === idParent &&
          saveTextAndEmoji[id] &&
          saveTextAndEmoji[id].trim().length > 0 && (
            <button className="btn btn-sm btn-accent mt-2 ml-3" type="submit" disabled={pending}>
            {pending ? "cargando..." : "responder"}
            </button>
          )}
          </div>
      </div>
      </div>
    </section>
  );
}

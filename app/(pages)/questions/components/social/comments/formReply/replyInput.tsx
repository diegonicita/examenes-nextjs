
import useEmoji from "@/app/hooks/questions/comments/useEmoji";
//@ts-ignore
import { useFormStatus } from "react-dom";
import { IconEmojiSmile } from "../../valorations/icons";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import i18n from '@emoji-mart/data/i18n/es.json'

export default function replyInput({
  id,
  idParent,
}: {
  id: number;
  idParent: string | number;
}) {
  const { pending } = useFormStatus();
  const {
    saveTextAndEmoji,
    handleInputComment,
    handleOpenEmoji,
    handleCloseEmoji,
    openEmoji,
    handleSaveEmoji,
    handleStopPropagation,
  } = useEmoji();
  return (
    <section className="flex flex-wrap items-start ml-16">
        <div className="">
          <img
            alt="profile"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            className="w-10 h-10 rounded-full mr-2"
          />
        </div>
        <div className="flex-grow">
        <div className=" relative w-full">
          <input
            type="text"
            placeholder={"add a comment to msg " + id}
            className="w-full p-2 focus:outline-none rounded-full border border-gray-300 "
            name="comment"
            id="comment"
            value={saveTextAndEmoji[id] || ""}
            onChange={(e) => handleInputComment(id, e)}
          />

          <span
            className="absolute right-5 top-3 cursor-pointer"
            onClick={handleOpenEmoji}
          >
            <IconEmojiSmile />
          </span>
        </div>
      <div>
        {idParent === idParent &&
          saveTextAndEmoji[id] &&
          saveTextAndEmoji[id].length > 0 && (
            <button className="btn btn-sm btn-accent mt-2 ml-3" type="submit" disabled={pending}>
            {pending ? "cargando..." : "responder"}
            </button>
          )}
          </div>
      </div>
      <div onClick={handleCloseEmoji}>
        {openEmoji && (
          <div onClick={handleStopPropagation} className="w-[348px]">
            <Picker data={data} onEmojiSelect=
            {(emoji:any) =>handleSaveEmoji(id,emoji)} 
            i18n={i18n} 
            locale="es" 
            searchPosition="none" />
          </div>
        )}
      </div>
    </section>
  );
}

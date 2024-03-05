import { useEmojiContext } from "@/app/hooks/questions/comments/useEmoji";
//@ts-ignore
import { useFormStatus } from "react-dom";
import { IconEmojiSmile } from "../valorations/icons";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import i18n from '@emoji-mart/data/i18n/es.json'

export default function mainCommentInput() {
  const { pending } = useFormStatus();
  const {
    saveTextAndEmoji,
    handleInputCommentNoId,
    handleOpenEmoji,
    handleSaveEmojiNoId,
    openEmoji,
    handleCloseEmoji,
  } = useEmojiContext();
  return (
    <section className="flex flex-col ">
     <div className="flex">
  
    <img
      alt="profile"
      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
      className="w-10 h-10 rounded-full mr-2"
    />
 
  <div className="flex-grow">
    <div className="relative w-[254px] md:w-full  ">
      <input
        type="text"
        placeholder="agrega un comentario"
        className="w-[254px] md:w-full p-2 focus:outline-none rounded-full border border-gray-300"
        name="comment"
        id="comment"
        value={saveTextAndEmoji || ""}
        onChange={handleInputCommentNoId}
      />
      <span
        className="absolute right-6 md:right-5 top-3 cursor-pointer"
        onClick={handleOpenEmoji}
      >
        <IconEmojiSmile />
      </span>
    </div>
    {saveTextAndEmoji.trim().length > 0 && (
      <button
        className="btn btn-sm btn-accent mt-2 ml-3"
        type="submit"
        disabled={pending}
      >
        {pending ? "cargando..." : "agregar comentario"}
      </button>
    )}
  </div>
  </div>
  <div onClick={handleCloseEmoji}>
    {openEmoji && (
      <>
        {openEmoji && <Picker data={data} 
        emojiButtonSize={30} 
        onEmojiSelect={handleSaveEmojiNoId} 
        i18n={i18n} locale="es" 
        searchPosition="none" 
        onClickOutside={handleCloseEmoji} />}
      </>
    )}
  </div>
</section>
  );
}

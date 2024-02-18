import useEmoji from "@/app/hooks/questions/comments/useEmoji";
//@ts-ignore
import { useFormStatus } from "react-dom";
import EmojiPicker from "emoji-picker-react";
import { IconEmojiSmile } from "../valorations/icons";

export default function mainCommentInput() {
  const { pending } = useFormStatus();
  const {
    saveTextAndEmoji,
    handleStopPropagation,
    handleInputCommentNoId,
    handleOpenEmoji,
    handleSaveEmojiNoId,
    openEmoji,
    handleCloseEmoji,
  } = useEmoji();
  return (
    <section className="flex items-start flex-wrap">
  <div>
    <img
      alt="profile"
      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
      className="w-10 h-10 rounded-full mr-2"
    />
  </div>
  <div className="flex-grow">
    <div className="relative w-full">
      <input
        type="text"
        placeholder="agrega un comentario"
        className="w-full p-2 focus:outline-none rounded-full border border-gray-300"
        name="comment"
        id="comment"
        value={saveTextAndEmoji || ""}
        onChange={handleInputCommentNoId}
      />
      <span
        className="absolute right-5 top-3 cursor-pointer"
        onClick={handleOpenEmoji}
      >
        <IconEmojiSmile />
      </span>
    </div>
    {saveTextAndEmoji && saveTextAndEmoji.length > 0 && (
      <button
        className="btn btn-sm btn-accent"
        type="submit"
        disabled={pending}
      >
        {pending ? "cargando..." : "agregar comentario"}
      </button>
    )}
  </div>
  <div onClick={handleCloseEmoji}>
    {openEmoji && (
      <div onClick={handleStopPropagation} className="w-[348px]">
        <EmojiPicker  searchDisabled onEmojiClick={handleSaveEmojiNoId}/>
      </div>
    )}
  </div>
</section>

  
  );
}

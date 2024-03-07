import { useEmojiContext } from "@/app/hooks/questions/comments/useEmoji";
//@ts-ignore
import { useFormStatus } from "react-dom";
import { IconEmojiSmile } from "../valorations/icons";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import i18n from "@emoji-mart/data/i18n/es.json";

export default function mainCommentInput() {
  const { pending } = useFormStatus();
  const {
    saveTextAndEmoji,
    handleInputCommentNoId,
    handleOpenEmoji,
    handleSaveEmojiNoId,
    openEmoji,
    handleCloseEmoji,
    textareaRef
  } = useEmojiContext();
  return (
    <section className="flex flex-col">
      <div className="flex flex-row ">
        <img
          alt="profile"
          src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          className="w-10 h-10 rounded-full mr-2"
        />
          <div  className=" w-full" >
            <textarea
            ref={textareaRef as React.RefObject<HTMLTextAreaElement>}
              placeholder="agrega un comentario"
              className="resize-none h-10 overflow-hidden w-full py-2 pl-3 pr-12 focus:outline-none rounded-lg border border-gray-300"
              name="comment"
              id="comment"
              value={saveTextAndEmoji || ""}
              onChange={handleInputCommentNoId}
            />
            <div className="w-full relative">
            <span
            id="emojiSpan"
              className="absolute right-8 bottom-[15px] cursor-pointer"
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
            {openEmoji && (
              <Picker
                data={data}
                emojiButtonSize={30}
                onEmojiSelect={handleSaveEmojiNoId}
                i18n={i18n}
                locale="es"
                searchPosition="none"
                onClickOutside={handleCloseEmoji}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}

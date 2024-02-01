import useEmoji from "@/app/hooks/questions/comments/useEmoji";
import { IconEmojiSmile } from "../valorations/icons";
import EmojiPicker from "emoji-picker-react";

export default function replyInput({
  id,
  idParent,
}: {
  id: number;
  idParent: string | number;
}) {
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
    <section className="flex flex-col ml-16">
      <div className="flex flex-row">
        <div className="">
          <img
            alt="profile"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            className="w-10 h-10 rounded-full mr-2"
          />
        </div>
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
      </div>
      <div>
        {idParent === idParent &&
          saveTextAndEmoji[id] &&
          saveTextAndEmoji[id].length > 0 && (
            <button className="btn btn-sm btn-accent" type="submit">
              reply
            </button>
          )}
      </div>
      <div onClick={handleCloseEmoji}>
        {openEmoji && (
          <div onClick={handleStopPropagation} className="w-[348px]">
            <EmojiPicker
              searchDisabled
              onEmojiClick={(emoji) => handleSaveEmoji(id, emoji)}
            />
          </div>
        )}
      </div>
    </section>
  );
}

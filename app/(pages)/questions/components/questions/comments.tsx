"use client";
import Image from "next/image";
import { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import CommentInput from "./commentInput";

export default function Comments() {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [saveTextAndEmoji, setSaveTextAndEmoji] = useState<string | undefined>(
    ""
  );

  const handleOpenEmoji = () => {
    setOpenEmoji(!openEmoji);
  };

  const handleCloseEmoji = () => {
    setOpenEmoji(false);
  };

  const handleSaveEmoji = (emoji: EmojiClickData, event: MouseEvent) => {
    setSaveTextAndEmoji((prevText) => prevText + emoji.emoji);
    if(emoji.emoji){
      setOpenEmoji(false)
    }
  };
  const handleInputComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSaveTextAndEmoji(e.target.value);
  };
  const handleStopPropagation: React.MouseEventHandler<HTMLDivElement> = (
    e
  ) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div>
      <div className="flex flex-row mt-2 ">
        <div className="avatar">
          <div className="w-10 h-10 rounded-full mr-2">
            <img
              alt="profile"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              width={20}
              height={20}
            />
          </div>
        </div>

        <CommentInput
          handleInputComment={handleInputComment}
          emojiPick={saveTextAndEmoji}
          handleEmoji={handleOpenEmoji}
        >
          {saveTextAndEmoji && (
            <button className="btn-sm btn mt-2" type="submit">
              post
            </button>
          )}
        </CommentInput>
      </div>
      <div onClick={handleCloseEmoji}>
        {openEmoji && (
          <div onClick={handleStopPropagation} className="w-[348px]">
            <EmojiPicker  searchDisabled onEmojiClick={handleSaveEmoji} />
          </div>
        )}
      </div>
    </div>
  );
}

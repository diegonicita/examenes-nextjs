"use client";

import EmojiPicker from "emoji-picker-react";
import CommentInput from "./commentInput";
import useEmoji from "@/app/hooks/questions/comments/useEmoji";
import UserComments from "./userComments";

export default function Comments() {
  const {
    handleSaveEmoji,
    openEmoji,
    handleInputComment,
    handleCloseEmoji,
    handleOpenEmoji,
    handleStopPropagation,
    saveTextAndEmoji,
  } = useEmoji();
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
            <EmojiPicker searchDisabled onEmojiClick={handleSaveEmoji} />
          </div>
        )}
      </div>
      <UserComments />
    </div>
  );
}

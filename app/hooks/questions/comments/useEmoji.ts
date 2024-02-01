import { EmojiClickData } from "emoji-picker-react";
import { useState } from "react";

export default function useEmoji() {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [saveTextAndEmoji, setSaveTextAndEmoji] = useState<string|any>(
    ""
  );
 
  const handleOpenEmoji = () => {
    setOpenEmoji(!openEmoji);
  };

  const handleCloseEmoji = () => {
    setOpenEmoji(false);
  };
  const resetSaveTextAndEmoji = () => {
    setSaveTextAndEmoji({});
  };


  const handleSaveEmoji = (commentId: number, emoji: EmojiClickData, event?: MouseEvent) => {
    setSaveTextAndEmoji((prevText:any) => ({
      ...prevText,
      [commentId]: (prevText[commentId] || '') + emoji?.emoji,
    }));
    if (emoji.emoji) {
      setOpenEmoji(false);
    }
  };
  const handleInputComment = (commentId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSaveTextAndEmoji((prevText:any) => ({
      ...prevText,
      [commentId]: e.target.value,
    }));
  };
  const handleStopPropagation: React.MouseEventHandler<HTMLDivElement> = (
    e
  ) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return {
    handleInputComment,
    handleStopPropagation,
    handleSaveEmoji,
    handleCloseEmoji,
    handleOpenEmoji,
    saveTextAndEmoji,
    openEmoji,
    setSaveTextAndEmoji,
    resetSaveTextAndEmoji
  };
}

import { EmojiClickData } from "emoji-picker-react";
import { useState } from "react";

export default function useEmoji() {
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
    if (emoji.emoji) {
      setOpenEmoji(false);
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
  return {
    handleInputComment,
    handleStopPropagation,
    handleSaveEmoji,
    handleCloseEmoji,
    handleOpenEmoji,
    saveTextAndEmoji,
    openEmoji
  };
}

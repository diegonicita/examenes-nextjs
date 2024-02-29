
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
  const resetSaveTextAndEmojiNoId = () => {
    setSaveTextAndEmoji("");
  };
  const handleSaveEmojiNoId = ( emoji:any, event?: MouseEvent) => {
    setSaveTextAndEmoji((prevText:any) => prevText + emoji.native)
    if (emoji.native) {
      setOpenEmoji(false);
    }
  };
  const handleInputCommentNoId = ( e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSaveTextAndEmoji(e.target.value);
  };


  const handleSaveEmoji = (commentId: number, emoji: any, event?: MouseEvent) => {
    setSaveTextAndEmoji((prevText:any) => ({
      ...prevText,
      [commentId]: (prevText[commentId] || '') + emoji?.native,
    }));
    if (emoji.native) {
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
    resetSaveTextAndEmoji,
    handleSaveEmojiNoId,
    handleInputCommentNoId,
    resetSaveTextAndEmojiNoId,
  };
}

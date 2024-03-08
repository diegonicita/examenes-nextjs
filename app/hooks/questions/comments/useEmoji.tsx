"use client"
import { EmojiContext, useEmojiContext} from "@/app/utils/comments/emoji";
import { useState, useRef} from "react";

function UseEmoji({children}:{children:React.ReactNode}) {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [saveTextAndEmoji, setSaveTextAndEmoji] = useState<string|any>(
    ""
  );
 const textareaRef = useRef<HTMLTextAreaElement | null>(null);;
  
 const handleTextareaRef = (spanId:string) =>{
  if (textareaRef.current) {
    textareaRef.current.style.height = "40px"; 

    const newHeight = textareaRef.current.scrollHeight + "px";
    if (newHeight !== textareaRef.current.style.height) {
      textareaRef.current.style.height = newHeight;
    }
    const div = document.getElementById(spanId);
    if (div) {
      div.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }
 }
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
  const handleInputCommentNoId = ( e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setSaveTextAndEmoji(e.target.value);
    handleTextareaRef("emojiSpanmaincomponent")
    
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
  const handleInputComment = (commentId: number, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setSaveTextAndEmoji((prevText:any) => ({
      ...prevText,
      [commentId]: e.target.value,
    }));
    handleTextareaRef("spanidreplybutton")
  };
  
  return (
    <EmojiContext.Provider value={{
    textareaRef,
    handleInputComment,
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
    }}>
      {children}
    </EmojiContext.Provider>
  );
}
export {useEmojiContext,UseEmoji,EmojiContext}

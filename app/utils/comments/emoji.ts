import { EmojiContextProps } from "@/app/models/comments/Emoji";
import React from "react";
import { createContext, useContext, useRef } from "react";

export const InitialState: EmojiContextProps = {
  handleInputComment: () => {},
  handleSaveEmoji: () => {},
  handleCloseEmoji: () => {},
  handleOpenEmoji: () => {},
  saveTextAndEmoji: "",
  openEmoji: false,
  setSaveTextAndEmoji: () => {},
  resetSaveTextAndEmoji: () => {},
  handleSaveEmojiNoId: () => {},
  handleInputCommentNoId: () => {},
  resetSaveTextAndEmojiNoId: () => {},
  textareaRef: React.createRef<HTMLTextAreaElement | null>()
};
export const EmojiContext = createContext<EmojiContextProps>(InitialState)

export function useEmojiContext (){
  const context = useContext(EmojiContext)
  if(!context){
    throw new Error ("emojiContext must be used within a emoji.Provider");
  }
  return context

}

import { EmojiContextProps } from "@/app/models/comments/Emoji";
import { createContext, useContext, useRef } from "react";

export const initialState: EmojiContextProps = {
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
  textareaRef: useRef<HTMLTextAreaElement | null>(null)
};
export const EmojiContext = createContext<EmojiContextProps>(initialState)

export function useEmojiContext (){
  const context = useContext(EmojiContext)
  if(!context){
    throw new Error ("emojiContext must be used within a DropDownContext.Provider");
  }
  return context

}

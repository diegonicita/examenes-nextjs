"use client"
import { useState,useContext,createContext } from "react";
interface EmojiContextProps {
  handleInputComment: (commentId: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveEmoji: (commentId: number, emoji: any, event?: MouseEvent) => void;
  handleCloseEmoji: () => void;
  handleOpenEmoji: () => void;
  saveTextAndEmoji: "", 
  openEmoji: boolean;
  setSaveTextAndEmoji: React.Dispatch<React.SetStateAction<{ [key: number]: string } | string>>;
  resetSaveTextAndEmoji: () => void;
  handleSaveEmojiNoId: (emoji: any, event?: MouseEvent) => void;
  handleInputCommentNoId: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetSaveTextAndEmojiNoId: () => void;
}
const initialState: EmojiContextProps = {
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
};

const EmojiContext = createContext<EmojiContextProps>(initialState)

function useEmojiContext (){
  const context = useContext(EmojiContext)
  if(!context){
    throw new Error ("emojiContext must be used within a DropDownContext.Provider");
  }
  return context

}

function UseEmoji({children}:{children:React.ReactNode}) {
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
  
  return (
    <EmojiContext.Provider value={{
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

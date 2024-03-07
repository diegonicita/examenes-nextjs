"use client"
import { useState,useContext,createContext, useRef, useEffect } from "react";
interface EmojiContextProps {
  handleInputComment: (commentId: number, e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSaveEmoji: (commentId: number, emoji: any, event?: MouseEvent) => void;
  handleCloseEmoji: () => void;
  handleOpenEmoji: () => void;
  saveTextAndEmoji: "", 
  openEmoji: boolean;
  setSaveTextAndEmoji: React.Dispatch<React.SetStateAction<{ [key: number]: string } | string>>;
  resetSaveTextAndEmoji: () => void;
  handleSaveEmojiNoId: (emoji: any, event?: MouseEvent) => void;
  handleInputCommentNoId: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  resetSaveTextAndEmojiNoId: () => void;
  textareaRef:null
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
  textareaRef:null
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
  const textareaRef = useRef(null);
  // useEffect(() => {
  //   // Set the initial height to 40px
  //   if (textareaRef.current) {
  //     textareaRef.current.style.height = "40px";
  //   }
  // }, [textareaRef]);

 const handleTextareaRef = () =>{
  if (textareaRef.current) {
    textareaRef.current.style.height = "40px"; 

    const newHeight = textareaRef.current.scrollHeight + "px";
    if (newHeight !== textareaRef.current.style.height) {
      textareaRef.current.style.height = newHeight;
    }
    const span = document.getElementById("emojiSpan");
    if (span) {
      span.style.top = `${textareaRef.clientHeight}px`;
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
    handleTextareaRef()
    
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

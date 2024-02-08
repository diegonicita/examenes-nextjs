
import { useState } from "react";

  interface OpenCommentsState {
    [commentId: number]: boolean;
  }

export default function useFormAction(){
  const [openComments, setOpenComments] = useState<OpenCommentsState>({});
  const handleOpenComments = (commentId: number) => {
    setOpenComments((prevOpenComments: any) => ({
      ...prevOpenComments,
      [commentId]: !prevOpenComments[commentId],
    }));
  };
  return {openComments, handleOpenComments}
}
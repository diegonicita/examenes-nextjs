import createReply from "@/app/(pages)/questions/actions/createComment";
//@ts-ignore
import { useFormState} from "react-dom";
import { useEffect, useState } from "react";
import useEmoji from "./useEmoji";
const initialState = {
    message: "",
  };
  interface OpenCommentsState {
    [commentId: number]: boolean;
  }

export default function useFormAction(){
    const [state, formAction] = useFormState(createReply, initialState);
    const {
        resetSaveTextAndEmoji,
      } = useEmoji();
  const [reset, setReset] = useState("");
  const [openComments, setOpenComments] = useState<OpenCommentsState>({});

  useEffect(() => {
    if (state?.message === "success") {
      setReset(Math.random().toString());
      resetSaveTextAndEmoji();
    }
  }, [state]);
  const handleOpenComments = (commentId: number) => {
    setOpenComments((prevOpenComments: any) => ({
      ...prevOpenComments,
      [commentId]: !prevOpenComments[commentId],
    }));
  };
  return {openComments, handleOpenComments,reset,formAction}
}
"use client";
import React, { useEffect, useState } from "react";
import useEmoji from "@/app/hooks/questions/comments/useEmoji";
import createReply from "../../../actions/createComment";
//@ts-ignore
import { useFormState,useFormStatus } from "react-dom";
import UserComments from "./userCommments";
import ReplyInput from "./replyInput";


const initialState = {
  message: "",
};
interface OpenCommentsState {
  [commentId: number]: boolean;
}
const RenderTree = ({
  tree,
  parentId,
  depth = 0,
}: {
  tree: any;
  parentId: any;
  depth: number;
}) => {
  const {
    resetSaveTextAndEmoji,
  } = useEmoji();

  const [state, formAction] = useFormState(createReply, initialState);
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

  if (tree) {
    return tree.map(
      (t: {
        comment: {
          id: number;
          id_user: number;
          id_parent_comment: number | string;
          comment_text: string;
          id_question: number;
        };
        children: object;
      }) =>
        t.comment.id_parent_comment === parentId && (
          <div key={t.comment.id}>
            <div className="" style={{ paddingLeft: `${depth * 20}px` }}>
              <UserComments
                data={t}
                handleOpenReply={() => handleOpenComments(t.comment.id)}
              />
              <form key={reset} action={formAction}>
                <input
                  id="id_parent_comment"
                  type="hidden"
                  name="id_parent_comment"
                  value={t.comment.id}
                />
                <input
                  id="id_question"
                  type="hidden"
                  name="id_question"
                  value={t.comment.id_question.toString()}
                />
                {openComments[t.comment.id] &&
                  t.comment.id_parent_comment ===
                    t.comment.id_parent_comment && (
                    <ReplyInput id={t.comment.id} idParent={t.comment.id_parent_comment} />   
                  )}
              </form>
            </div>
            <RenderTree
              tree={t.children}
              parentId={t.comment.id}
              depth={depth + 1}
            />
          </div>
        )
    );
  }
};

export default RenderTree;

"use client";
import React from "react";

import UserComments from "./userCommments";
import ReplyInput from "./replyInput";
import { UserType } from "@/app/models/User";
import useFormAction from "@/app/hooks/questions/comments/useFormAction";

const RenderTree = ({
  tree,
  parentId,
  depth = 0,
  currentUser,
}: {
  tree: any;
  parentId: any;
  depth: number;
  currentUser: UserType
}) => {
  const {reset,formAction,openComments,handleOpenComments} = useFormAction()
  
  if (tree) {
    return tree.map(
      (t: {
        comment: {
          id: number;
          id_user: number;
          id_parent_comment: number | string;
          comment_text: string;
          id_question: number;
          user_name: string
        };
        children: object;
      }) =>
        t.comment.id_parent_comment === parentId && (
          <div key={t.comment.id}>
            <div className="" style={{ paddingLeft: `${depth * 20}px` }}>
              <UserComments
                data={t}
                currentUser={currentUser}
              />
              <button type="button" className=" ml-14 my-2.5 cursor-pointer" onClick={() => handleOpenComments(t.comment.id)}
            >
            responder
          </button>
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
              currentUser={currentUser}
            />
          </div>
        )
    );
  }
};

export default RenderTree;

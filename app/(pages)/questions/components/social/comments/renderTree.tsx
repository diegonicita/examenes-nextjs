"use client";
import React from "react";
import UserComments from "./userCommments";
import { UserType } from "@/app/models/User";
import useFormAction from "@/app/hooks/questions/comments/useFormAction";
import { startTransition } from "react";
import FormReply from "./formReply/formReply";

const RenderTree = ({
  tree,
  parentId,
  depth = 0,
  currentUser,
}: {
  tree: any;
  parentId: any;
  depth: number;
  currentUser: UserType;
}) => {
  const { openComments, handleOpenComments } = useFormAction();

  if (tree) {
    return tree.map(
      (t: {
        comment: {
          id: number;
          id_user: number;
          id_parent_comment: number | string;
          comment_text: string;
          id_question: number;
          user_name: string;
          created_at: string;
        };
        children: object;
      }) =>
        t.comment.id_parent_comment === parentId && (
          <div key={t.comment.id}>
            <div className="" style={{ paddingLeft: `${depth * 20}px` }}>
              <UserComments data={t} currentUser={currentUser}>
                <button
                  name="button"
                  type="button"
                  className=" text-left ml-5 my-2.5 cursor-pointer"
                  onClick={() => {
                    startTransition(() => {
                      handleOpenComments(t.comment.id);
                    });
                  }}
                >
                  <span>responder</span>
                </button>
              </UserComments>
              {openComments[t.comment.id] &&
                parentId === t.comment.id_parent_comment&& (
                <FormReply t={t} />
                )}
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

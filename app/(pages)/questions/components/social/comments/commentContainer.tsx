"use client";
import React, { useState } from "react";
//@ts-ignore
import Comments from "./comments";
import { getUserComments } from "../../../actions/commentPost";
import CommentInput from "./commentInput";
import ReplyComments from "./replyComments";

export default function CommentContainer(id_question: number, id_user: number) {
  const [openComments, setOpenComments] = useState(false);
  const [openReplyComments, setOpenReplyComments] = useState(false);
  const [data, setData] = useState<any>([]);

  const handleOpenComments = async () => {
    setOpenComments(!openComments);
    setOpenReplyComments(false);
    const result = await getUserComments();
    setData(result);
  };
  const handleOpenReply = async () => {
    setOpenReplyComments(!openReplyComments);
  };

  return (
    <>
      <div className="flex gap-4 ">
        <button
          type="button"
          className="p-2 w-44 cursor-pointer transition duration-300 bg-base-200 hover:bg-base-300"
          onClick={handleOpenComments}
        >
          Comentarios
        </button>
      </div>
      {(openComments || (data && data.length > 0)) && (
        <div className="w-full pr-8">
          <Comments key={data}>
            {openComments && (
              <>
              <CommentInput id_user={id_user} id_question={id_question} messages={data} setMessages={setData} />
              
              <div className="flex flex-row gap-2 ml-2 mt-2">
              <span>que opinas</span>
              <button onClick={handleOpenReply} className="cursor-pointer">
                respuesta
              </button>
            </div>
            <div className="flex flex-col">
        {openReplyComments && (
          <>
            <ReplyComments />
          </>
        )}
      </div>
            </>
            )}
          </Comments>
         
        </div>
      )}
    </>
  );
}

"use client";
import ReportComment from "./reportComment/reportComment";
import { useState } from "react";
import DropDownOptions from "./dropDown";
import { UserType } from "@/app/models/User";
import { UserData } from "@/app/models/questions/comments/commentData";
import EditCommentContent from "./editComment/editCommentContent";
import TimeAgo from "./createdComment";

interface UserCommentsProps {
  data: UserData;
  currentUser: UserType;
  children: React.ReactNode;
}
async function UserComments({
  data,
  currentUser,
  children,
}: UserCommentsProps) {
  const [openEdit, setOpenEdit] = useState(false);

  const handleClickEdit = () => {
    setOpenEdit(true);
  };
  const handleCancel = () => {
    setOpenEdit(false);
  };

  return (
    <section className="grid grid-cols-[40px,1fr] mt-5 pr-5">
      <>
        <div className="">
          <img
            alt="profile"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            className="w-10 h-10 rounded-full"
          />
        </div>
        <main className="flex flex-col ">
          <div className=" card w-full p-3 bg-gray-200 shadow-xl ml-2 relative">
            <div className="flex flex-row ">
              <div className="flex-grow">
                <h1 className="text-base font-bold">
                  {data?.comment?.user_name}
                </h1>
              </div>

              <span
                className={`${openEdit === true ? "hidden" : "text-xs mr-1"}`}
              >
                <TimeAgo timestamp={data.comment.created_at} />
              </span>

              <div className={`${openEdit === true ? "hidden" : "text-sm"}`}>
                {(data && data?.comment.id_user === currentUser?.id) ||
                currentUser.role === "admin" ? (
                  <DropDownOptions
                    id={data?.comment.id}
                    onclick={handleClickEdit}
                  />
                ) : (
                  <ReportComment />
                )}
              </div>
            </div>

            {openEdit ? (
              <EditCommentContent
                id={data?.comment.id}
                data={data?.comment.comment_text}
                handleCancel={handleCancel}
              />
            ) : (
              <p className="text-base">{data?.comment?.comment_text}</p>
            )}
          </div>
          <div className={`${openEdit === true ? "hidden" : ""}`}>
            {children}
          </div>
        </main>
      </>
    </section>
  );
}

export default UserComments;

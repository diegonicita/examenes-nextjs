"use client";
import ReportComment from "./reportComment/reportComment";
import { useRef, useState } from "react";
import DropDownOptions from "./dropDown";
import type { UserType } from "@/app/models/User";
import type { UserData } from "@/app/models/questions/comments/commentData";
import EditCommentContent from "./editComment/editCommentContent";
import TimeAgo from "./createdCommentTime";
import DeleteComments from "./deleteComment/deleteComment";
import EditComment from "./editComment/editComment";

interface UserCommentsProps {
	data: UserData;
	currentUser: UserType;
	children: React.ReactNode;
	currentClassRef: React.RefObject<HTMLDivElement>;
}
async function UserComments({
	data,
	currentUser,
	children,
	currentClassRef,
}: UserCommentsProps) {
	const [openEdit, setOpenEdit] = useState(false);

	const handleClickEdit = () => {
		setOpenEdit(true);
	};
	const handleCancel = () => {
		setOpenEdit(false);
	};

	return (
		<section className="grid grid-cols-[40px,1fr] mt-5">
			<>
				<div className="w-10 h-10">
					<img
						alt="profile"
						src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
						className="w-10 h-10 rounded-full"
					/>
				</div>
				<main className="flex flex-col ">
					<div className=" card p-3 mb-2 min-w-[100px] max-w-[500px] bg-gray-200 shadow-xl ml-1 relative">
						<div className="flex flex-row ">
							<div className="flex-grow">
								<h1 className="text-base font-bold text-gray-800">
									{data?.comment?.user_name}
								</h1>
							</div>
							<span
								className={`${
									openEdit === true ? "hidden" : "text-xs mr-1 text-gray-800"
								}`}
							>
								<TimeAgo timestamp={data.comment.created_at} />
							</span>

							<div className={`${openEdit === true ? "hidden" : "text-sm"}`}>
								{(data && data?.comment.id_user === currentUser?.id) ||
								currentUser.role === "admin" ? (
									<DropDownOptions>
										<DeleteComments
											id={data?.comment.id}
											classRef={currentClassRef}
										/>
										<EditComment openEditClick={handleClickEdit} />
									</DropDownOptions>
								) : (
									<DropDownOptions>
										<ReportComment id={data?.comment.id} />
									</DropDownOptions>
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
							<p className="text-base text-gray-800 max-w-[470px] break-all">
								{data?.comment?.comment_text}
							</p>
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

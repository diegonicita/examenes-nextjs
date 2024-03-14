"use client";
import React, { memo, useRef } from "react";
import UserComments from "./userCommments";
import type { UserType } from "@/app/models/User";
import useFormAction from "@/app/hooks/questions/comments/useFormAction";
import { startTransition } from "react";
import FormReply from "./formReply/formReply";
import { UseDropDown } from "@/app/hooks/questions/comments/useDropDown";
import { PickerComponent } from "./formReply/replyInput";
import { UseEmoji } from "@/app/hooks/questions/comments/useEmoji";

const ReplyButton = memo(
	({
		handleOpenComments,
		commentId,
	}: {
		handleOpenComments: (commentId: number) => void;
		commentId: number;
	}) => {
		const handleClick = () => {
			startTransition(() => {
				handleOpenComments(commentId);
			});
		};

		return (
			<button
				name="button"
				type="button"
				className="text-left ml-5 my-2.5 cursor-pointer "
				onClick={handleClick}
			>
				<span>responder</span>
			</button>
		);
	},
);

const RenderTree = ({
	tree,
	parentId,
	depth = 0,
	currentUser,
}: {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	tree: any;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	parentId: any;
	depth: number;
	currentUser: UserType;
}) => {
	const { openComments, handleOpenComments } = useFormAction();
	const currentClassRef = useRef<HTMLDivElement | null>(null);

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
					<div key={t.comment.id} ref={currentClassRef}>
						<UseEmoji key={t.comment.id}>
							<div className="" style={{ paddingLeft: `${depth * 10}px` }}>
								<UseDropDown key={t.comment.id}>
									<UserComments
										data={t}
										currentUser={currentUser}
										currentClassRef={currentClassRef}
									>
										<ReplyButton
											handleOpenComments={handleOpenComments}
											commentId={t.comment.id}
										/>
									</UserComments>
								</UseDropDown>
								{openComments[t.comment.id] &&
									parentId === t.comment.id_parent_comment && (
										<FormReply t={t} />
									)}
							</div>
							<PickerComponent id={t.comment?.id} />

							<RenderTree
								tree={t.children}
								parentId={t.comment.id}
								depth={depth + 1}
								currentUser={currentUser}
							/>
						</UseEmoji>
					</div>
				),
		);
	}
};

export default RenderTree;

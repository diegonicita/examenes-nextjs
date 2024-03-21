"use client";
import type { QuestionSQL as QuestionType } from "@/app/models/QuestionSQL";
import Question from "./question";
import AllTheCommentContent from "../social/comments/allTheCommentContent/allthecommentContent";
import type { SubjectType } from "@/app/models/Subject";
import type { UserType } from "@/app/models/User";

export const Examen = ({
	data,
	userId,
	temas,
	currentUser,
	treeComments,
}: {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	data: any;
	userId: number;
	temas: SubjectType[];
	currentUser: UserType;
	treeComments: string[];
}) => {
	return (
		<>
			{data?.map((item: QuestionType) => (
					<div
						key={item.id}
						className=" border border-gray-400 rounded my-4 px-4 pb-4"
					>
						<Question item={item} userId={userId} />
						<AllTheCommentContent
							item={item}
							treeComments={treeComments}
							currentUser={currentUser}
						/>
					</div>
				))}
		</>
	);
};

export default Examen;

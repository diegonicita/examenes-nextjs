"use client";
import type { QuestionSQL as QuestionType } from "@/app/models/QuestionSQL";
import Question from "./question";

export const Examen = ({
	data,
	userId,
}: {
	data: any;
	userId: any;
}) => {
	return (
		<>
			{data &&
				data.map((item: QuestionType, index: number) => (
					<div
						key={index}
						className=" border border-gray-400 rounded my-4 px-4 pb-4"
					>
						<Question item={item} userId={userId} />
					</div>
				))}
		</>
	);
};

export default Examen;

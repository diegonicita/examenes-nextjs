import createReply from "@/app/(pages)/questions/actions/createComment";
import { useEmojiContext } from "@/app/hooks/questions/comments/useEmoji";
import { useEffect, useState } from "react";
//@ts-ignore
import { useFormState } from "react-dom";
import { ReplyInput, PickerComponent } from "./replyInput";

const initialState = {
	message: "",
};
interface FormReplyProps {
	t: {
		comment: {
			id: number;
			id_user: number;
			id_parent_comment: number | string;
			comment_text: string;
			id_question: number;
			user_name: string;
			created_at: string;
		};
	};
}

export default function FormReply({ t }: FormReplyProps) {
	const [state, formAction] = useFormState(createReply, initialState);
	const { resetSaveTextAndEmoji } = useEmojiContext();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (state?.message === "success") {
			setReset(Math.random().toString());
			resetSaveTextAndEmoji();
		}
	}, [state]);
	const [reset, setReset] = useState("");
	return (
		<form key={reset} action={formAction}>
			<input
				id="id_parent_comment"
				type="hidden"
				name="id_parent_comment"
				value={t.comment?.id}
			/>
			<input
				id="id_question"
				type="hidden"
				name="id_question"
				value={t.comment?.id_question.toString()}
			/>
			<ReplyInput id={t.comment?.id} idParent={t.comment?.id_parent_comment} />
		</form>
	);
}

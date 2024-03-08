"use client";
import { EmojiContext, useEmojiContext } from "@/app/utils/comments/emoji";
import { useState, useRef } from "react";

function UseEmoji({ children }: { children: React.ReactNode }) {
	const [openEmoji, setOpenEmoji] = useState(false);
	//biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [saveTextAndEmoji, setSaveTextAndEmoji] = useState<string | any>("");
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	const handleTextareaRef = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "40px";

			const newHeight = `${textareaRef.current.scrollHeight}px`;
			if (newHeight !== textareaRef.current.style.height) {
				textareaRef.current.style.height = newHeight;
			}
		}
	};
	const handleOpenEmoji = () => {
		setOpenEmoji(!openEmoji);
	};

	const handleCloseEmoji = () => {
		setOpenEmoji(false);
	};
	const resetSaveTextAndEmoji = () => {
		setSaveTextAndEmoji({});
	};
	const resetSaveTextAndEmojiNoId = () => {
		setSaveTextAndEmoji("");
	};
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const handleSaveEmojiNoId = (emoji: any, event?: MouseEvent) => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		setSaveTextAndEmoji((prevText: any) => prevText + emoji.native);
		if (emoji.native) {
			setOpenEmoji(false);
		}
	};
	const handleInputCommentNoId = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		e.preventDefault();
		setSaveTextAndEmoji(e.target.value);
		handleTextareaRef();
	};
	const handleSaveEmoji = (
		commentId: number,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		emoji: any,
		event?: MouseEvent,
	) => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		setSaveTextAndEmoji((prevText: any) => ({
			...prevText,
			[commentId]: (prevText[commentId] || "") + emoji?.native,
		}));
		if (emoji.native) {
			setOpenEmoji(false);
		}
	};
	const handleInputComment = (
		commentId: number,
		e: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		e.preventDefault();
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		setSaveTextAndEmoji((prevText: any) => ({
			...prevText,
			[commentId]: e.target.value,
		}));
		handleTextareaRef();
	};

	return (
		<EmojiContext.Provider
			value={{
				textareaRef,
				handleInputComment,
				handleSaveEmoji,
				handleCloseEmoji,
				handleOpenEmoji,
				saveTextAndEmoji,
				openEmoji,
				setSaveTextAndEmoji,
				resetSaveTextAndEmoji,
				handleSaveEmojiNoId,
				handleInputCommentNoId,
				resetSaveTextAndEmojiNoId,
			}}
		>
			{children}
		</EmojiContext.Provider>
	);
}
export { useEmojiContext, UseEmoji, EmojiContext };

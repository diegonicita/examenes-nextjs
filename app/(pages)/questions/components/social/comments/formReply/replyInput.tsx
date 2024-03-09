import { useEmojiContext } from "@/app/hooks/questions/comments/useEmoji";
//@ts-ignore
import { useFormStatus } from "react-dom";
import { IconEmojiSmile } from "../../valorations/icons";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import i18n from "@emoji-mart/data/i18n/es.json";

export function PickerComponent({ id }: { id: number }) {
	const { openEmoji, handleCloseEmoji, handleSaveEmoji } = useEmojiContext();

	return (
		<div
			onClick={handleCloseEmoji}
			className="mt-2 pr-5 "
			onKeyDown={handleCloseEmoji}
		>
			{openEmoji && (
				<Picker
					data={data}
					onEmojiSelect={(emoji: string) => handleSaveEmoji(id, emoji)}
					i18n={i18n}
					locale="es"
					emojiButtonSize={30}
					searchPosition="none"
					onClickOutside={handleCloseEmoji}
				/>
			)}
		</div>
	);
}
export function ReplyInput({
	id,
	idParent,
}: {
	id: number;
	idParent: string | number;
}) {
	const { pending } = useFormStatus();
	const { textareaRef, saveTextAndEmoji, handleInputComment, handleOpenEmoji } =
		useEmojiContext();
	return (
		<section className="flex flex-col ml-12 ">
			<div className="flex flex-row">
				<img
					alt="profile"
					src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
					className="w-10 h-10 rounded-full"
				/>

				<div className="ml-1 w-full ">
					<div>
						<textarea
							ref={textareaRef as React.RefObject<HTMLTextAreaElement>}
							placeholder="responde a este comentario"
							className="resize-none h-10 overflow-hidden w-full py-2 pl-3 pr-12 focus:outline-none rounded-lg border border-gray-300"
							name="comment"
							id="comment"
							value={saveTextAndEmoji[id] || ""}
							onChange={(e) => handleInputComment(id, e)}
						/>
						<div className="flex justify-end mr-8">
							<div className="absolute">
								<span
									className="absolute -top-8  cursor-pointer"
									onClick={handleOpenEmoji}
									onKeyUp={handleOpenEmoji}
								>
									<IconEmojiSmile />
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-1 ml-12">
				{saveTextAndEmoji[id] && saveTextAndEmoji[id].trim().length > 0 && (
					<button
						className="btn btn-sm btn-accent "
						type="submit"
						disabled={pending}
					>
						{pending ? "cargando..." : "responder"}
					</button>
				)}
			</div>
		</section>
	);
}

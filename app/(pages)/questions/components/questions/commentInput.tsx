import { IconEmojiSmile } from "./icons";

export default function CommentInput({
    handleEmoji,
    emojiPick,
    handleInputComment,
    children,
  }: {
    handleEmoji: () => void;
    emojiPick: string | undefined;
    handleInputComment: (event: React.ChangeEvent<HTMLInputElement>) => void;
    children: React.ReactNode;
  }) {

    const input = (formData:FormData) => {
      const comment = formData.get("comment")
      console.log(comment);

    }
    return (
      <div className=" flex-grow">
        <form action={input}>
          <div className="rounded-full border border-gray-300 relative p-2">
            <input
              type="text"
              value={emojiPick}
              placeholder="add a comment"
              className="focus:outline-none w-full "
              name="comment"
              onChange={handleInputComment}
            />
            <span
              className="absolute right-5 top-3 cursor-pointer"
              onClick={handleEmoji}
            >
              <IconEmojiSmile />
            </span>
          </div>
          <div className="">{children}</div>
        </form>
      </div>
    );
  }
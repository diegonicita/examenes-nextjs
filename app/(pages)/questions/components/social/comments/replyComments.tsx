import useEmoji from "@/app/hooks/questions/comments/useEmoji"
import EmojiPicker from "emoji-picker-react"
import { IconEmojiSmile } from "../valorations/icons"

export default function ReplyComments (){
    const {
        saveTextAndEmoji,
        handleInputComment,
        handleOpenEmoji,
        handleStopPropagation,
        openEmoji,
        handleCloseEmoji,
        handleSaveEmoji,
      } = useEmoji()
    return (
        <section>
      <form >
        <div className="flex flex-row w-full">
      <div className="avatar">
          <div className="w-10 h-10 rounded-full mr-2">
            <img
              alt="profile"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              width={20}
              height={20}
            />
          </div>
        </div>
        <div className="rounded-full border border-gray-300 relative p-2 w-full">
          <input
            type="text"
            value={saveTextAndEmoji}
            placeholder="add a reply"
            className="focus:outline-none w-full"
            name="comment"
            onChange={handleInputComment}
          />

          <span
            className="absolute right-5 top-3 cursor-pointer"
            onClick={handleOpenEmoji}
          >
            <IconEmojiSmile />
          </span>
        </div>
        {saveTextAndEmoji && (
          <button className="btn-sm btn mt-2" type="submit">
            reply
          </button>
        )}
        {/* <label htmlFor="">{errorClientSide}</label> */}
        </div>
      </form>
      <div onClick={handleCloseEmoji}>
        {openEmoji && (
          <div onClick={handleStopPropagation} className="w-[348px]">
            <EmojiPicker searchDisabled onEmojiClick={handleSaveEmoji} />
          </div>
        )}
      </div>
      </section>
    )
}
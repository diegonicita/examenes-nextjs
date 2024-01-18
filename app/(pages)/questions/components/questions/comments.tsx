"use client";
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import fetchEmoji from "../../actions/fetchEmoji";
import { useState } from "react";
import { IconEmojiSmile } from "./icons";


function CommentInput({handleEmoji}:{handleEmoji: () => void}) {
  const [inputText, setInputtext] = useState();

  return (
    <div className="rounded-full border border-gray-300 relative p-2">
      <input
        type="text"
        value={inputText}
        onChange={(e) => e.target.value}
        placeholder="add a comment"
        className=""
      />
      <span
        className="absolute right-5 top-3 cursor-pointer"
        onClick={handleEmoji}
      >
        <IconEmojiSmile />
      </span>
      
    </div>
  );
}
export default function Comments() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [openEmoji, setOpenEmoji] = useState(false);
  const handleOpenEmoji = () => {
    setOpenEmoji(!openEmoji);
  };

  const emojiGroup = [
    { group: "smileys_emotion", emoji: "😀" },
    { group: "people_body", emoji: "👋" },
    { group: "component", emoji: "🦰" },
    { group: "animals_nature", emoji: "🐵" },
    { group: "food_drink", emoji: "🍇" },
    { group: "travel_places", emoji: "🌍" },
    { group: "activities", emoji: "🎃" },
    { group: "objects", emoji: "👓" },
    { group: "symbols", emoji: "🏧" },
    { group: "flags", emoji: "🏁" },
  ];
  const handleEmoji = async (term: string | undefined) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("emojiGroup", term);
    } else {
      params.delete("emojiGroup");
    }
    replace(`${pathname}?${params.toString()}`);
    if (term !== undefined) {
      await fetchEmoji({ group: term }).then((response) =>
        console.log(response)
      );
    }
  };

  return (
    <div>
    <div className="flex flex-row items-center  mt-2">
      <div className="avatar">
        <div className="w-10 rounded-full mr-2">
          <img
            alt="profile"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            width={20}
            height={20}
          />
        </div>
      </div>
      
      <CommentInput handleEmoji={handleOpenEmoji} />
      </div>
      <div className="flex flex-row">
      {openEmoji &&
        emojiGroup?.map((emoji, index) => (
          <div
            key={index}
            className="w-10 cursor-pointer  border border-gray-300"
            onClick={() => handleEmoji(emoji.group)}
          >
            {emoji.emoji}
          </div>
        ))}
        </div>
        </div>
  );
}

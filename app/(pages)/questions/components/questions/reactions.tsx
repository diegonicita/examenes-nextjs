"use client";
import React, { useState } from "react";
import {ReactionBarSelector } from "@charkour/react-reactions";
import Tooltip from "./tooltip";
export default function Reactions() {
  const [valueEmoji, setValueEmoji] = useState<string | null>(null);
  const reactions = [
    { label: "excelente", node: "❤️", key:"me encanta" },
    { label: "buena", node: "👍", key:"me gusta"  },
    { label: "mala", node: "👎", key:"no me gusta"}
  ];
  const handleReaction = (key:string) => {
    setValueEmoji(key);
    console.log(key)
  };
  const handleValueEmoji = () => {
    setValueEmoji(null);
  };

  return (
    <Tooltip
      content={
        <ReactionBarSelector iconSize={25} reactions={reactions} onSelect={handleReaction} />
      }
    >
      {!valueEmoji ? (
        <button className="p-2 cursor-pointer transition duration-300 group-hover:bg-gray-200">
          Que te parecio esta pregunta
        </button>
      ) : (
        <div className="cursor-pointer" onClick={handleValueEmoji}>
          {valueEmoji} {reactions.find(reaction => reaction?.key === valueEmoji)?.node}
        </div>
      )}
    </Tooltip>
  );
}

"use client";
import React, { useRef, useState } from "react";
import {ReactionBarSelector, ReactionCounter  } from "@charkour/react-reactions";
import Tooltip from "./tooltip";
//@ts-ignore
import { useFormStatus, useFormState } from 'react-dom'
import { createValoration } from "../../actions/createValoration";
const initialState = {
  message:"testing"
}
export interface ReactionCounterObject {
  node: JSX.Element;
  label: string;
  by: string;
}

export default function Reactions({id_question}:{id_question:string}) {
  const [valueEmoji, setValueEmoji] = useState<string | null>(null);
  const { pending } = useFormStatus()   
  const [state, formAction] = useFormState(createValoration, initialState)
  const keyRef = useRef<string|null>(null)
  
  const reactions = [
    { label: "excelente", node: "❤️", key: "love" },
    { label: "buena", node: "👍", key: "like"  },
    { label: "mala", node: "👎", key: "unlike"}
  ];
  const reactionsCounter:ReactionCounterObject[] = [
    {node: <div>👍</div>, by: "excelente",label: "excelente" },
    { node: <div>❤️</div>, by: "excelente",label: "excelente"},
    {node: <div>👎</div>, by: "excelente",label: "excelente"}
  ]; 
  const handleReaction = (key:string) => {
    setValueEmoji(key);
    keyRef.current = key
    console.log("Reaction", keyRef);
    var formData = new FormData()
    formData.append('id', id_question)
    formData.append('like', keyRef.current === "like" ? "true" : "false")
    formData.append('unlike', keyRef.current === "unlike" ? "true" : "false")
    formData.append('love', keyRef.current === "love" ? "true" : "false")
    formAction(formData)
    console.log(key)
  };
  const handleValueEmoji = () => {
    setValueEmoji(null);
    keyRef.current = null
    
    var formData = new FormData()
    formData.append('id', id_question)
    formData.append('like', "false")
    formData.append('unlike', "false")
    formData.append('love', "false")
    formAction(formData)
  };

  return (
    <Tooltip
      content={
        <ReactionBarSelector iconSize={25} reactions={reactions} onSelect={handleReaction} />
      }
    >
      {!valueEmoji ? (
        <form action={formAction}>
        <button type="submit" className="p-2 cursor-pointer transition duration-300 group-hover:bg-gray-200">
          Que te parecio esta pregunta
        </button>
        </form>
      ) : (
        <ReactionCounter showTotalOnly showOthersAlways reactions={reactionsCounter} />
      )}
    </Tooltip>
  );
}

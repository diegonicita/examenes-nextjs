"use client"
//@ts-ignore
import { useState,useOptimistic, useRef } from "react"
import { z } from "zod"
import createComment from "@/app/(pages)/questions/actions/commentPost"

export default function useCommentInput({setMessages,messages,id_question,id_user}:{setMessages?:any,messages?:any}){
const [errorClientSide, setErrorClientSide] = useState('')
const formRef = useRef<HTMLFormElement>(null)

  const schema = z.object({
    comment: z
      .string({ invalid_type_error: 'el comentario tiene que ser un string' })
      .min(2, { message: 'debe contener al meenos una palabra' })
      .trim(),
  })

 const input = async (formData: FormData) => {
    const newTodo = { comment: formData.get('comment') }
    const result = schema.safeParse(newTodo)
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        setErrorClientSide(issue.path[0] + ': ' + issue.message + '. ')
      })
    } else {
      setErrorClientSide('')
      formRef?.current?.reset()
    }
    addOptimisticMessage({
      id_question: id_question,
      id_user: id_user,
      //@ts-ignore
      comment_text: result.data.comment,
      id_parent_comment: 1,
    })
    
    //@ts-ignore
    console.log(id_question.id_question)
    const response = await createComment({ comment: result.data.comment,id_question:id_question.id_question })
    console.log(response)
   
    if (response?.message === 'success' && setMessages && messages) {
        setMessages((prevMessages: any) => [
          ...prevMessages,
          {
            id_question: id_question,
            id_user: id_user,
            //@ts-ignore
            comment_text: result.data.comment,
            id_parent_comment: 1,
          },
        ]);
      }
    };

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state: any, newMessage: any) => {
      return [...state, newMessage]
    },
  )
  
  return {optimisticMessages,errorClientSide,formRef,input}
}


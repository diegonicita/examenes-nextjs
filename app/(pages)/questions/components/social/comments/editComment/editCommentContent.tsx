"use client"
import editCommenAction from "@/app/(pages)/questions/actions/editComments/editComment";
//@ts-ignore
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};


 function EditCommentContent({data,handleCancel,id}:{data:any, handleCancel:() => void,id:string|number}) {
  const [state, formAction] = useFormState(editCommenAction, initialState);
  return (
    <section className=" flex flex-col ">
      <form action={async (formData:any) => {
        handleCancel()
        await formAction(formData)}}>
        <input type="hidden" name="id" value={id}/>
        <textarea name="comment_text" defaultValue={data} className="p-3 w-full bg-gray-200 resize-none outline-none "/>
        <button type="submit" className="btn">
          Guardar cambios
        </button>
        <button type="button" className="btn" onClick={handleCancel}>
          cancelar
        </button>
      </form>
    </section>
  );
}
export default EditCommentContent

"use client";
import editCommenAction from "@/app/(pages)/questions/actions/editComments/editComment";
import { useEffect, useRef,startTransition} from "react";

//@ts-ignore
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

function EditCommentContent({
  data,
  handleCancel,
  id,
}: {
  data: any;
  handleCancel: () => void;
  id: string | number;
}) {
  const [state, formAction] = useFormState(editCommenAction, initialState);
  
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    // Set the cursor at the end of the text area content
    textareaRef.current?.setSelectionRange(data.length, data.length);
  }, [data.length]);

  return (
    <section className="flex flex-col">
  <form
    action={async (formData: any) => {
      handleCancel();
      await formAction(formData);
    }}
  >
    <input type="hidden" name="id" value={id} />
    <textarea
      ref={textareaRef}
      name="comment_text"
      defaultValue={data}
      className="min-w-[100px] bg-gray-200 text-gray-800 resize-none outline-none"
      autoFocus
    />
    <div className="flex flex-row items-center gap-x-1">
      <button
        type="submit"
        className="p-2 bg-accent min-w-[90px] text-gray-800 hover:bg-teal-500 active:bg-teal-800 rounded-full text-[9.8px] focus:outline-none focus:ring focus:border-teal-300"
      >
        Guardar cambios
      </button>
      <button
        type="button"
        className="p-2 bg-white min-w-[90px] text-gray-800 hover:bg-slate-100 active:bg-slate-400 rounded-full text-[10px] focus:outline-none focus:ring focus:border-slate-300"
        onClick={() => {
          startTransition(() => {
            handleCancel();
          });
        }}
      >
        cancelar
      </button>
    </div>
  </form>
</section>

  );
}
export default EditCommentContent;

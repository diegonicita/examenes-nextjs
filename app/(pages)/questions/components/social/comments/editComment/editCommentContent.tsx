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
    <section className=" flex flex-col ">
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
          className="p-3 w-full bg-gray-200 resize-none outline-none "
          autoFocus
        />
        <button type="submit" className="btn btn-accent mr-2">
          Guardar cambios
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            startTransition(() => {
              handleCancel();
            });
          }}
        >
          cancelar
        </button>
      </form>
    </section>
  );
}
export default EditCommentContent;

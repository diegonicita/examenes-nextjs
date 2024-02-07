"use client";
import deleteComment from "@/app/(pages)/questions/actions/deleteComments/deleteComments";
import { notifyErrors } from "@/app/components/form/toasters/notifyErrors";
import { notifySuccess } from "@/app/components/form/toasters/notifySuccess";
//@ts-ignore
import { useFormState } from "react-dom";
import { IconTrashCan } from "../icons/iconTrash";

const initialState = {
  message: "",
};
console.log(initialState);

export default function DeleteComments({
  onclick,
  id,
}: {
  onclick: () => void;
  id: number;
}) {
  console.log(id);
  const [state, formAction] = useFormState(deleteComment, initialState);
  console.log(state);

  if (state?.message === "success") {
    notifySuccess("Tu Mensaje ha sido Eliminado exitosamente");
  } else if (state?.message === "error") {
    notifyErrors(
      "Lo sentimos no pudimos eliminar tu mensaje Inténtalo mas tarde."
    );
  }

  return (
    <div>
      <button
      type="button"
        className=" w-full h-10 flex items-center gap-3 hover:bg-gray-200 active:bg-gray-400 p-2"
        onClick={() => {
          const modal = document.getElementById(
            "my_modal_1"
          ) as HTMLDialogElement | null;
          if (modal) {
            modal.showModal();
          }
        }}
      >
        <span><IconTrashCan /></span>
        Eliminar
      </button>
      <dialog id="my_modal_1" className="modal">
        <h1>{state.message}</h1>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Estas seguro que quieres eliminar este mensaje?</h3>
          <p className="py-4">
            Todos las respuestas incluidos en este comentario seran eliminados
          </p>
          <div className="modal-action">
            <form method="dialog" action={formAction}>
              {/* if there is a button in form, it will close the modal */}
              <input type="hidden" name="id" value={id} />
              
              <button className="btn mr-2 " onClick={onclick}>
                Cerrar
              </button>
              <button className="btn btn-accent" type="submit">Eliminar</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

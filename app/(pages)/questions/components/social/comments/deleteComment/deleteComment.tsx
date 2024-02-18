"use client";
import { IconTrashCan } from "../icons/iconTrash";
import DeleteForm from "./deleteForm";

export default function DeleteComments({

  id,
}: {

  id: number;
}) {
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
        <span>
          <IconTrashCan />
        </span>
        Eliminar
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Estas seguro que quieres eliminar este mensaje?
          </h3>
          <p className="py-4">
            Todos las respuestas incluidos en este comentario seran eliminados
          </p>
          <div className="modal-action">
            <DeleteForm id={id}  />
          </div>
        </div>
      </dialog>
    </div>
  );
}

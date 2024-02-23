import { useDropDownContext } from "@/app/hooks/questions/comments/useDropDown";

export default function ContentReport() {
  const { closeDropdown } = useDropDownContext();
  return (
    <dialog id="content_report" className="modal">
      <form>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">
            Escribe la razon por la que quieres reportar este comentario
          </h3>

          <textarea placeholder="Reportar commentario" name="report" id="" className="mb-2 p-3 resize-none outline-none w-full border border-gray-300" />
          {/* if there is a button in form, it will close the modal */}
          <div className="flex justify-end gap-x-2">
          <button
            className="btn"
            type="button"
            onClick={() => {
              const modal = document.getElementById(
                "content_report"
              ) as HTMLDialogElement;
              if (modal) {
                modal.close();
                closeDropdown();
              }
            }}
          >
            Close
          </button>
          <button className="btn btn-accent">reportar</button>
          </div>
        </div>
      </form>
    </dialog>
  );
}

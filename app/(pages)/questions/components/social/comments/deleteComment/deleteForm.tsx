//@ts-ignore
import { useFormState } from "react-dom";
import DeleteComment from "@/app/(pages)/questions/actions/deleteComments/deleteComments";
import { notifySuccess } from "@/app/components/form/toasters/notifySuccess";
import { notifyErrors } from "@/app/components/form/toasters/notifyErrors";
import useDropDown from "@/app/hooks/questions/comments/useDropDown";

const initialState = {
  message: "",
};

export default function DeleteForm({ id}: { id: number}) {
  const [state, formAction] = useFormState(DeleteComment, initialState);
  const { closeDropdown} = useDropDown()
  
  console.log(state.message, "state");
  const handleCloseDropdownandModal = () =>{
    const modal = document.getElementById(
      "my_modal_1"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
    const dropdown = document.getElementById("dropdown-comment") as HTMLElement | null
    if(dropdown){
    dropdown.classList.add("bg-red-100")
    }
  }

  return (
    <form action={formAction}>
      {/* if there is a button in form, it will close the modal */}
      <input type="hidden" name="id" value={id} />
      <button
        onClick={handleCloseDropdownandModal}
        className="btn mr-2 "
        type="button"
      >
        Cerrar
      </button>
      <button className="btn btn-accent" type="submit">
        Eliminar
      </button>
    </form>
  );
}

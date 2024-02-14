//@ts-ignore
import { useFormState } from "react-dom";
import DeleteComment from "@/app/(pages)/questions/actions/deleteComments/deleteComments";
import { notifySuccess } from "@/app/components/form/toasters/notifySuccess";
import { notifyErrors } from "@/app/components/form/toasters/notifyErrors";

const initialState = {
  message: "",
};

export default function DeleteForm({
  onclick,
  id,
}: {
  onclick: () => void;
  id: number;
}) {
  const [state, formAction] = useFormState(DeleteComment, initialState);
  console.log(state.message, "state");
  //  if (state?.message === "success") {
  //   notifySuccess("Tu Mensaje ha sido Eliminado exitosamente");
  // } else if (state?.message === "error") {
  //   notifyErrors(
  //     "Lo sentimos no pudimos eliminar tu mensaje Inténtalo mas tarde."
  //   );
  // }
  return (
    <form action={formAction}>
      {/* if there is a button in form, it will close the modal */}
      <input type="hidden" name="id" value={id} />
      <button className="btn mr-2 " onClick={onclick}>
        Cerrar
      </button>
      <button className="btn btn-accent" type="submit">
        Eliminar
      </button>
    </form>
  );
}

//@ts-ignore
import { useFormState, useFormStatus } from "react-dom";
import DeleteComment from "@/app/(pages)/questions/actions/deleteComments/deleteComments";
import { notifySuccess } from "@/app/components/form/components/notifySuccess";
import { notifyErrors } from "@/app/components/form/components/notifyErrors";
import { useDropDownContext } from "@/app/hooks/questions/comments/useDropDown";
import { useEffect } from "react";
import { refreshAction } from "@/app/(pages)/consults/actions/refresh";

const initialState = {
	message: "",
};
function Submit({ classRef }: { classRef: React.RefObject<HTMLDivElement> }) {
	const { pending } = useFormStatus();

	if (pending) {
		if (classRef) {
			classRef?.current?.classList?.add("hidden");
		}
	} else {
		setTimeout(() => {
			if (classRef) {
				classRef.current?.classList?.remove("hidden");
			}
		}, 4000);
	}

	return (
		<button
			type="submit"
			className={`${pending ? "btn btn-disabled" : "btn btn-accent"}`}
			disabled={pending}
		>
			{pending ? "Eliminando" : "Eliminar"}
		</button>
	);
}
interface DeleteCommentsProps {
	id: number;
	classRef: React.RefObject<HTMLDivElement>;
}

export default function DeleteForm({ id, classRef }: DeleteCommentsProps) {
	const [state, formAction] = useFormState(DeleteComment, initialState);
	const { closeDropdown } = useDropDownContext();

	const modal = document.getElementById(
		"my_modal_1",
	) as HTMLDialogElement | null;
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		refreshAction();

		if (state?.message === "success") {
			notifySuccess("Tu comentario ha sido eliminado exitosamente");
			if (modal) {
				modal.close();
			}
			closeDropdown();
		} else {
			if (state?.message === "error") {
				notifyErrors("No pudimos Eliminar tu comentario, Inténtalo más tarde.");
				if (modal) {
					modal.close();
				}
				closeDropdown();
			}
		}
	}, [state?.message]);

	const handleCloseDropdownandModal = () => {
		if (modal) {
			modal.close();
		}
		closeDropdown();
	};

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
			<Submit classRef={classRef} />
		</form>
	);
}

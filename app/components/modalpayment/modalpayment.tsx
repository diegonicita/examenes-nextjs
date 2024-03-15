export default function ModalPayment({ name }: { name: string | null }) {
	return (
		<dialog id="modal_payment" className="modal">
			<div className="modal-box">
				<h3 className="font-bold text-lg">Hola {name || ""}!</h3>
				<p className="py-4">
					Parece que te interesa lo que hay en la página siguiente, que incluye
					información sobre preguntas. Para desbloquear el acceso, tendrás que
					suscribirte o realizar una compra. Si todavía no estás preparado, ¡no
					te preocupes! Todavía tienes mucho contenido del que disfrutar. Si
					tienes alguna pregunta, no dudes en ponerte en contacto con nosotros.
				</p>
				<div className="modal-action">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button type="submit" className="btn">
							Close
						</button>
					</form>
				</div>
			</div>
		</dialog>
	);
}

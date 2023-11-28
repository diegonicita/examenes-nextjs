"use client"

import Rating from "./rating";

export default function Review() {

    const handleModal = () => {
        const modal = document.getElementById("my_modal_3") as HTMLDialogElement
        modal?.showModal()
    }
  return (
    <section>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
  <div className="text-center">
      <button
        className="bg-accent 
        rounded-md btn btn-accent text-accent-content text-center"
        onClick={handleModal}
      >
        open modal
      </button>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-center">Como calificas estas preguntas</h3>
          <Rating />
          <h4 className="font-bold text-lg my-3">Escribe tu opinion</h4>
          <textarea className="p-3 w-full border border-black" />
        </div>
      </dialog>
    </section>
  );
}

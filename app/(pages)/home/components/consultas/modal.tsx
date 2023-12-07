'use client'

export default function Modal({
  id,
  title,
  description,
}: {
  id: string
  title: string
  description: string
}) {
  return (
    <section>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id={id} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-center">{title}</h3>
          <h4 className="text-center font-bold text-md my-3">{description}</h4>
        </div>
      </dialog>
    </section>
  )
}

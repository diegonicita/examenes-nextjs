"use client"
import deleteComment from "@/app/(pages)/questions/actions/deleteComments/deleteComments";
import { notifyErrors } from "@/app/components/form/toasters/notifyErrors";
import { notifySuccess } from "@/app/components/form/toasters/notifySuccess";
//@ts-ignore
import { useFormState } from 'react-dom'

const initialState = {
  message: '',
}
console.log(initialState)

export default function DeleteComments({onclick,id}:{onclick:() => void,id:number}){
  console.log(id)
  const [state, formAction] = useFormState(deleteComment, initialState)
  console.log(state)
  
  

  
  if (state?.message === "success") {
    notifySuccess("Tu Mensaje ha sido Eliminado exitosamente")
  }else if(state?.message === "error"){
    notifyErrors('Lo sentimos no pudimos eliminar tu mensaje Inténtalo mas tarde.')
  }

  
    return(
      <div >
        <button className="" onClick={()=>document.getElementById('my_modal_1').showModal()}>Eliminar</button>
      <dialog id="my_modal_1" className="modal">
        <h1>{state.message}</h1>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <form method="dialog" action={formAction}>
            {/* if there is a button in form, it will close the modal */}
            <input type="hidden" name="id" value={id} />
            <button type="submit">Eliminar</button>
            <button className="btn" onClick={onclick}>Close</button>
          </form>
        </div>
      </div>
    </dialog>
    </div>
    )
}


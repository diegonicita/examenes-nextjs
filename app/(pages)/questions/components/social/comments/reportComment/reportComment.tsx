
import ContentReport from "./contentReport";
import IconFlag from "./reportIcon";

export default function ReportComment({id}:{id:string | number}){
  
    return(
        <section >
          <button className=" w-full flex flex-row items-center hover:bg-gray-200 
        active:bg-gray-400 gap-x-3 cursor-pointer p-2" onClick={() =>{
          const modal = document.getElementById("content_report") as HTMLDialogElement
          console.log(modal,"report")
          if(modal){
            modal.showModal()
            
          }
          
        }} >
          <span><IconFlag /></span>
          <h1>Reportar</h1>
          </button>
          <ContentReport id={id} />
        </section>
    )
}
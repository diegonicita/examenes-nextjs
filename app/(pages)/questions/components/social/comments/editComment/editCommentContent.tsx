import { memo } from "react";

 function EditCommentContent({data,handleCancel}:{data:any, handleCancel:() => void}) {
  console.log(data);
  return (
    <section className=" flex flex-col ">
      <form action="">
        <textarea name="" className="p-3 w-full bg-gray-200 resize-none outline-none ">
          {data}
        </textarea>
        <button type="submit" className="btn">
          Guardar cambios
        </button>
        <button type="button" className="btn" onClick={handleCancel}>
          cancelar
        </button>
      </form>
    </section>
  );
}
export default memo(EditCommentContent)

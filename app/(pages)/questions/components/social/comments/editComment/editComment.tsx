import { startTransition } from "react";
import { IconEdit } from "../icons/iconEdit";

export default function EditComment({openEditClick}:{openEditClick:() => void}) {
  
  return (
    <section>
      <button onClick={() => {startTransition(() =>{ openEditClick() })}} className=" w-full h-10 flex items-center gap-3 hover:bg-gray-200 active:bg-gray-400 p-2">
        <span>
          <IconEdit />
        </span>
        Editar
      </button>
    </section>
  );
}

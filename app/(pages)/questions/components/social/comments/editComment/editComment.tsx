import { IconEdit } from "../icons/iconEdit";

export default function EditComment({onclick}:{onclick:() => void}) {
  return (
    <section>
      <button onClick={onclick} className=" w-full h-10 flex items-center gap-3 hover:bg-gray-200 active:bg-gray-400 p-2">
        <span>
          <IconEdit />
        </span>
        Editar
      </button>
    </section>
  );
}

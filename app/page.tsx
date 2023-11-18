export default function IndexPage() {
  return (
    <>
      <div className="flex flex-col items-center">
        <p className="font-semibold p-2 text-xl">
          Tareas realizadas y pendientes:
        </p>
        <ul>
          <li>Instalar Redux Toolkit ✔️</li>
          <li>Crear un nuevo Slice ✔️ </li>
          <li>Instalar Tailwind CSS ✔️</li>
          <li>Cambiar el PORT del build de nextjs ✔️</li>
          <li>Agregar RTK Query ✔️</li>
          <li>Agregar Daisy UI ✔️</li>
          <li>Dejar solo tailwind css para estilos ✔️</li>
          <li>Agregar metadata a las paginas ✔️</li>
          <li>RTK Query para buscar una pregunta ✔️</li>
          <li>RTK Query para buscar varias preguntas</li>
          <li>RTK Query para buscar preguntas por palabra clave</li>
          <li>Agregar Button para Cambiar Theme</li>
          <li>Agregar react-persist al proyecto</li>
          <li>Login con Google usando Nextjs Auth</li>
          <li>Login y Register usando el servidor de Webapp</li>
          <li>Crear un proyecto paralelo usando React Native</li>
          <li>Traer Componentes de Choices de Medicina creados en Webapp </li>
        </ul>
      </div>
    </>
  )
}

export const metadata = {
  title: 'Redux Toolkit',
}

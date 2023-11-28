/* Components */
export default function counterPage() {
  return (
    <>
      <div className="flex flex-col items-center px-8 max-w-[60rem] mx-auto mt-8">
        <div className="flex w-full justify-center mb-4">
          <div className="w-full text-start  text-xl font-bold">
            Tareas Pendientes
          </div>
          <div className="w-full text-xl font-bold text-start">
            Tareas Realizadas
          </div>
        </div>
        <div className="flex w-full justify-center">
          <div className="w-full text-start">
            <li>Home: Agregar un componente Carousel</li>
            <li>Register con Google</li>
            <li>RTK Query para buscar varias preguntas</li>
            <li>Login sin Google</li>
            <li>Register</li>
            <li>Agregar el token en un estado global</li>
            <li>RTK Query para buscar preguntas por palabra clave</li>
            <li>Agregar Button para Cambiar Theme</li>
            <li>Agregar react-persist al proyecto</li>
            <li>Login y Register usando el servidor de Webapp</li>
            <li>Crear un proyecto paralelo usando React Native</li>
            <li>Agregar Componentes creados en Webapp </li>
            <li>Arreglar metadata de las paginas</li>
          </div>
          <div className="w-full text-start">
            
            <li>Home: Agregar un componente Hero ✔️</li>
            <li>Login con Google ✔️</li>
            <li>Instalar Redux Toolkit ✔️</li>
            <li>Crear un nuevo Slice ✔️ </li>
            <li>Instalar Tailwind CSS ✔️</li>
            <li>Cambiar el PORT del build de nextjs ✔️</li>
            <li>Agregar RTK Query ✔️</li>
            <li>Agregar Daisy UI ✔️</li>
            <li>Dejar solo tailwind css para estilos ✔️</li>
            <li>RTK Query para buscar una pregunta ✔️</li>
          </div>
        </div>
      </div>
      {/* <Counter /> */}
    </>
  )
}

export const metadata = {
  title: 'Tareas',
}

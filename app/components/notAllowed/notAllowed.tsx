export default function NotAllowed() {
  return (
    <div className="flex flex-wrap justify-center px-8 max-w-[90rem] mx-auto mt-8">
      <div className="card max-w-[40rem] bg-base-100 shadow-xl m-2 border border-black px-4">
        <div className="card-body gap-0 px-1 text-start">
          <h1 className="font-bold">No tienes permiso para ver esta sección</h1>
        </div>
      </div>
    </div>
  )
}

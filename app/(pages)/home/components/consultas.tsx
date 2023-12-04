import SubmitButton from './submit'

export default function Consultas() {
  return (
    <div className="mx-auto max-w-[55rem] mb-8 px-8">
      <form className="flex flex-col">
        <h1 className="text-left md: text-slate-700 text-xl md:text-3xl pb-4">
          Consultas
        </h1>
        <div className="p-8 flex flex-col bg-base-200 rounded-lg">
          <label
            htmlFor="nombreyapellido"
            className="text-slate-800 text-base font-medium leading-none mb-[2px] pb-2"
          >
            Nombre y Apellido
          </label>
          <input
            type="text"
            placeholder="Ingresa tu nombre y apellido"
            className="h-16 px-4 py-4 bg-base rounded-md border border-base-300"
            name="fullname"
          />
          {/* <label className="text-error">{state?.fullname}</label> */}
          <label
            htmlFor=""
            className="text-slate-800 text-base font-medium 
      font-inter leading-none mb-[2px] mt-7 pb-2"
          >
            Correo electrónico
          </label>
          <input
            type="text"
            placeholder="vetcarefamily@gmail.com"
            className="h-16 px-4 py-4 bg-base rounded-md border border-base-300"
            name="email"
          />
          {/* <label className="text-error">{state?.email}</label> */}
          <label
            htmlFor=""
            className="text-slate-800 text-base font-medium 
      font-inter leading-none mb-[2px] mt-7 pb-2"
          >
            Mensaje
          </label>
          <textarea
            className="h-36 px-4 py-4 bg-base rounded-md border border-base-300"
            name="message"
          />
          {/* <label className="text-error">{state?.message}</label> */}
          <div className="mx-auto px-4 pt-8">
            <SubmitButton text="Enviar" />
          </div>
        </div>
      </form>
    </div>
  )
}

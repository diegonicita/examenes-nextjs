import SubmitButton from "./submitButton";

export default function Consultas(){
    return (
        <div className="flex flex-col items-center w-full">
        <form
    //   onSubmit={handleSubmit}
      className="md:w-[856px] md:h-[708px]"
    >
        
      <h1
        className="w-[292px] text-center md:text-left md:w-full text-slate-700 text-xl md:text-3xl 
      font-normal font-secular mb-[47px]"
      >
        {/* <Toaster /> */}
        Consultas
      </h1>
      <div className="flex flex-col justify-start md:w-full ">
      <label
        htmlFor="nombreyapellido"
        className="text-slate-800 text-base font-medium font-inter leading-none mb-[2px] pb-2"
      >
        Nombre y Apellido
      </label>
      <input
        type="text"
        placeholder="Ingresa tu nombre y apellido"
        className="w-[318px] 
      h-[62px] px-[23px] py-[21px] bg-gray-100 rounded-md border
       border-gray-200  md:w-full"
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
        className="w-[318px] 
      h-[62px] px-[23px] py-[21px] bg-gray-100 rounded-md border
       border-gray-200 md:w-full"
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
        className="w-[321px] h-[158px] bg-gray-100 rounded-md border 
      border-gray-200 md:w-full px-[23px] py-[21px] "
        name="message"
      />
      {/* <label className="text-error">{state?.message}</label> */}
      </div>
      <SubmitButton text="Enviar" />
      
    </form>
    </div>
    )
}
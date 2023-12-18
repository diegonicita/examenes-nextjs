// Este componente usa una clase llamada text-wrap-balance definida en global.css
import Image from 'next/image'
import heroImage from '@/app/assets/OIG-1.webp'
import ButtonLogin from './buttonLogin'

export default function Hero() {
  return (
    <div className="relative flex items-center justify-center px-10 text-accent-content">
      <div className="w-full max-w-[55rem] mx-auto">
        <section
          className="relative flex flex-col 
      items-center justify-center px-[21px]  pb-8 lg:items-start md:h-[550px]"
        >         
          <Image
            src={heroImage}
            alt="Pets Home"
            width={0}
            height={0}
            sizes="100vw"
            className="w-[20rem] pt-8 lg:absolute lg:right-16 lg:w-[30rem] xl:right-0"
          />
          <h1
            className="text-wrap-balance text-[20px] leading-[26px] 
        font-normal text-center sm:text-3xl lg:text-5xl lg:text-left max-w-lg lg:max-w-sm"
          >
            Exámenes de Residencias Médicas
          </h1>
          <p
            className="text-wrap-balance max-w-[20rem] text-center text-gray-500 
        text-sm font-normal font-inter leading-relaxed mt-5 mb-[25px] md:text-left"
          >
            Practica con nuestros examenes de residencias medicas. Mas de 5000
            preguntas disponibles de examenes de Argentina, España, México y
            Perú
          </p>
          <ButtonLogin />
        </section>
      </div>
    </div>
  )
}

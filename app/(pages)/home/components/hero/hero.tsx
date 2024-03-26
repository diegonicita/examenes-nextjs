// Este componente usa una clase llamada text-wrap-balance definida en global.css
import Image from 'next/image'
import heroImage from '@/app/assets/OIG-3.webp'
import ButtonLogin from './buttonLogin'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'

export default async function Hero() {
  const payload = await getInfoAuthCookie()

  return (
    <div className="relative flex items-center justify-center px-10 text-base-content">
      <div className="w-full max-w-[55rem] mx-auto">
        <section
          className="relative flex flex-col 
      items-center justify-center px-[21px] lg:items-start mt-12"
        >
          <Image
            src={heroImage}
            alt="Pets Home"
            width={0}
            height={0}
            sizes="100vw"
            className="w-[25rem] pt-8 lg:absolute -right-8 lg:w-[35rem]"
            priority
          />
          {/* <div className="w-[25rem] pt-8 top-14 lg:absolute lg:right-16 lg:w-[45rem] xl:right-0">
						<InputHome />
					</div> */}
          <h1
            className="text-wrap-balance text-3xl leading-12 
        font-normal text-center sm:text-3xl lg:text-5xl lg:text-left max-w-lg lg:max-w-sm"
          >
            Exámenes de Residencias Médicas
          </h1>
          <p
            className="text-wrap-balance max-w-[20rem] text-center
        text-sm -normal font-inter leading-relaxed mt-5 mb-2 md:text-left"
          >
            Practica con nuestros exámenes de residencias médicas. Más de 6000
            preguntas disponibles de exámenes de Argentina, España, México y
            Perú.
          </p>
          <p
            className="text-wrap-balance max-w-[20rem] text-center 
        text-sm -normal font-inter leading-relaxed mb-6 md:text-left"
          >
            Tambien puedes buscar preguntas por palabras claves (Ej: Neumonía).
            Es algo muy util para practicar mientras estudias un tema.
          </p>
          <ButtonLogin isLogin={payload ? true : false} />
        </section>
      </div>
    </div>
  )
}

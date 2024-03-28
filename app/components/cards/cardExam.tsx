'use server'
import type { ExamListItemType, ExamTypeFromApi } from '@/app/models/Exam'
import Image from 'next/image'
import Link from 'next/link'
import getCountryFlag from './helper/getCountryFlag'

const CardExam = ({
  item,
  year,
  link,
  total,
  userId,
}: {
  item: ExamTypeFromApi
  year: number | undefined
  link: string
  total: number
  userId: number | null
}) => {
  console.log(item.pais)
  return (
    <div className="flex flex-col gap-2 bg-base-200 rounded-box p-8">
      <div className="flex flex-col text-center">
        <h2 className="text-xl ">{item.titulo ? item.titulo : 'Sin título'}</h2>
        {!year && (
          <figure className="flex justify-center">
            {item.imagen ? (
              <Image
                src={`https://mercado.webapp.ar/images_medicina/${item?.imagen}`}
                alt="imagen"
                width={160}
                height={160}
                sizes={'100vh'}
                className="h-auto w-full max-w-40"
              />
            ) : (
              <Image
                src={'https://mercado.webapp.ar/images_medicina/medicina-1.png'}
                alt="imagen"
                width={0}
                height={0}
                sizes={'100vh'}
                className="h-auto w-full max-w-40"
              />
            )}
          </figure>
        )}
        {year && <h2 className="text-4xl font-bold p-4">{year}</h2>}
        {!year && (
          <div className="flex justify-center gap-2 items-center">
            <Image
              src={getCountryFlag(item.pais)}
              alt="Pets Home"
              width={0}
              height={0}
              sizes="100vw"
              className="w-4 h-3"
              priority
            />
            <span className="text-sm w-fit">{item.pais}</span>{' '}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center">{total} preguntas</div>
      </div>

      <Link
        href={{
          pathname: link,
          query: { page: '1' },
        }}
        className="btn btn-neutral"
      >
        Seleccionar
      </Link>
    </div>
  )
}

export default CardExam

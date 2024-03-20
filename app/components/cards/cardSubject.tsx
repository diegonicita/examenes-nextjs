import React from 'react'
import Image from 'next/image'
import type { SubjectType } from '@/app/models/Subject'
import Link from 'next/link'

function CardSubject({ item }: { item: SubjectType }) {
  const link = `/subjects/${item.id}`
  return (
    <div className="flex flex-col gap-2 bg-base-200 rounded-box p-8">
      <div className="flex flex-col text-center">
        <h2 className="text-xl text-center">
          {item.titulo ? item.titulo : 'Sin título'}
        </h2>
        <figure className="pt-0">
          {item.imagen ? (
            <Image
              src={'https://mercado.webapp.ar/images_medicina/' + item?.imagen}
              alt="imagen"
              width={0}
              height={0}
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
        <div className="flex flex-col gap-4 text-lg text-center pt-4">
          <div className="flex justify-center">{item?.total} preguntas</div>
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
      </div>
    </div>
  )
}

export default CardSubject

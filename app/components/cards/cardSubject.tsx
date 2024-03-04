import React from 'react'
import Image from 'next/image'
import type { SubjectType } from '@/app/models/Subject'
import Link from 'next/link'

export default function CardSubject({ item }: { item: SubjectType }) {
  const enlace = `/subjects/${item.id}`
  return (
    <Link href={enlace}>
      <div className="btn btn-ghost h-full p-0 border-0">
        <div className="card w-80 sm:w-60 md:w-40 bg-base-100 shadow-xl m-2 border border-black indicator hover:shadow-2xl h-40 pt-2">
          <span className="indicator-item badge badge-primary font-bold text-sm indicator-bottom indicator-end pr-2 mr-6 mb-1">
            {item?.total}
          </span>
          <figure className="pt-0">
            {item.imagen ? (
              <Image
                src={
                  'https://mercado.webapp.ar/images_medicina/' + item?.imagen
                }
                alt="imagen"
                width={0}
                height={0}
                sizes={'100vh'}
                className="h-auto w-80 sm:w-60 lg:w-28"
              />
            ) : (
              <Image
                src={'https://mercado.webapp.ar/images_medicina/medicina-1.png'}
                alt="imagen"
                width={0}
                height={0}
                sizes={'100vh'}
                className="h-auto w-80 sm:w-60 lg:w-28"
              />
            )}
          </figure>
          <div className="text-lg text-center flex-1">
            {/* <h1 className="font-bold">
          Código: <span>{item.id}</span>
        </h1> */}
            <div className="h-full flex items-center p-1">
              {/* <span className="font-bold">Título: </span> */}
              <div className="max-w-[10rem] text-sm mx-auto mb-2">
                {item.titulo ? item.titulo : 'Sin título'}
              </div>
            </div>
            <div className="h-auto">
              <span className="font-bold"></span>
              {/* {item.descripcion ? item.descripcion : 'sin descripción'} */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

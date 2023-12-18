import React from 'react'
import Image from 'next/image'
import defaultImage from '@/app/assets/OIG-4.jpg'
import type { ProductType } from '@/app/models/Product'

export default function Card({ item }: { item: ProductType }) {
  return (
    <div className="card pb-2 bg-base-100 shadow-xl m-2 border border-black rounded-none">
      <figure className="pt-0 rounded-none">
        {item.imagen ? (
          <Image
            src={'https://mercado.webapp.ar/images/' + item?.imagen}
            alt="imagen"
            width={0}
            height={0}
            sizes={'100vh'}
            className="h-auto w-[12rem]"
          />
        ) : (
          <Image
            src={defaultImage}
            alt="imagen"
            width={0}
            height={0}
            sizes={'100vh'}
            className="h-auto w-[12rem]"
          />
        )}
      </figure>
      <div className="text-xs gap-0 px-1 text-center">
        <h1 className="font-bold">
          Código: <span>{item.id}</span>
        </h1>
        <div className="h-auto">
          <span className="font-bold">Título: </span>
          {item.titulo ? item.titulo : 'Sin título'}
        </div>
        <div className="h-auto">
          <span className="font-bold"></span>
          {/* {item.descripcion ? item.descripcion : 'sin descripción'} */}
        </div>
      </div>
    </div>
  )
}

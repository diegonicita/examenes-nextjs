import React from 'react'
import Image from 'next/image'
import defaultImage from '@/app/assets/OIG-4.jpg'
import type { ExamType } from '@/app/models/Exam'

export default function Card({ item }: { item: ExamType }) {
  return (
    <div className="card w-80 sm:w-60 md:w-48 bg-base-100 shadow-xl m-2 border border-black rounded-none">
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
            className="h-auto w-[22rem]"
          />
        )}
      </figure>
      <div className="text-lg text-center flex-1">
        {/* <h1 className="font-bold">
          Código: <span>{item.id}</span>
        </h1> */}
        <div className="h-full flex items-center p-1">
          {/* <span className="font-bold">Título: </span> */}
          <div className="max-w-[10rem] mx-auto">
          {item.titulo ? item.titulo : 'Sin título'}
          </div>
        </div>
        <div className="h-auto">
          <span className="font-bold"></span>
          {/* {item.descripcion ? item.descripcion : 'sin descripción'} */}
        </div>
      </div>
    </div>
  )
}

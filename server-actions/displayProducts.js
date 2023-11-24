'use server'
import Image from 'next/image'
import React from 'react'

export default async function DisplayProducts({ result }) {
  return (
    <div className="flex items-start px-8 max-w-[60rem] mx-auto mt-8">
      {result &&
        result.map((p, index) => (
          <div key={index} className="card bg-base-100 shadow-xl m-2 border border-black">
            <figure>
              <Image
                src={'https://mercado.webapp.ar/images/' + p.imagen}
                alt="imagen"
                width={0}
                height={0}
                sizes={'100vh'}
                className="pt-2 w-fit h-[10rem]"
              />
            </figure>
            <div className="card-body gap-0 px-1 text-center">
            <h1 className="font-bold mb-4">
              Producto Id: <span>{p.id}</span>
            </h1>
              <div className="h-12">{p.titulo}</div>
              <div className="h-12"><span className="font-bold">
                {'Descripcion:'}</span>{p.descripcion ? p.description:' sin descripción'}
              </div>
              <div className="mt-4 h-6">
                {'Precio: $'}{p.precio}
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

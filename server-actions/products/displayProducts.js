'use server'
import Image from 'next/image'
import React from 'react'
import DeleteProduct from './deleteProduct'
import executeQuery from '@/server-actions/helpers/mysqldb'

export default async function DisplayProducts() {
  const result = await executeQuery('select * from productos', [])

  return (
    <div className="flex flex-wrap justify-center px-8 max-w-[90rem] mx-auto mt-8">
      {result &&
        result.map((p, index) => (
          <div
            key={index}
            className="card max-w-[40rem] bg-base-100 shadow-xl m-2 border border-black px-4"
          >
            {p && p.id > 4 && <DeleteProduct id={p.id} />}
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
            <div className="card-body gap-0 px-1 text-center max-w-[12rem]">
              <h1 className="font-bold mb-4">
                Producto Id: <span>{p.id}</span>
              </h1>
              <div className="h-12">{p.titulo ? p.title : 'Sin título'}</div>
              <div className="h-12">
                <span className="font-bold">{'Descripcion: '}</span>
                {p.descripcion ? p.descripcion : 'sin descripción'}
              </div>
              <div className="mt-4 h-6">
                {'Precio: $'}
                {p.precio}
              </div>
            </div>
          </div>
        ))}
      {result && result.length === 0 && <p>No hay productos</p>}
      {!result && (
        <div className="w-full p-4 text-center">
          <p className="badge badge-lg p-4 badge-error text-error-content">
            No se pudo establecer una conexion
          </p>
        </div>
      )}
    </div>
  )
}

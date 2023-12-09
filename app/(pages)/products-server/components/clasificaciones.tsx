'use server'
import Image from 'next/image'
import React from 'react'
import defaultImage from '@/app/assets/OIG-4.jpg'

async function getData() {
  const res = await fetch('http://localhost:5000/api/get-questions-statistics', { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Clasificaciones() {
  const result = await getData()

  return (
    <div className="flex flex-wrap justify-center px-8 max-w-[90rem] mx-auto mt-8">
      {result &&
        result.examenes.map(
          (
            p: {
              id: number
              imagen: string
              titulo: string
              descripcion: string
            },
            index: number,
          ) => (
            <div
              key={index}
              className="card max-w-[40rem] bg-base-100 shadow-xl m-2 border border-black"
            >
              <figure>
                {p.imagen ? (
                  <Image
                    src={'https://mercado.webapp.ar/images/' + p?.imagen}
                    alt="imagen"
                    width={0}
                    height={0}
                    sizes={'100vh'}
                    className="h-fit w-[12rem]"
                  />
                ) : (
                  <Image
                    src={defaultImage}
                    alt="imagen"
                    width={0}
                    height={0}
                    sizes={'100vh'}
                    className="h-fit w-[12rem]"
                  />
                )}
              </figure>
              <div className="card-body gap-0 px-1 text-center max-w-[12rem]">
                <h1 className="font-bold">
                  Examen ID: <span>{p.id}</span>
                </h1>
                <div className="h-auto">
                  <span className="font-bold">Tema: </span>
                  {p.titulo ? p.titulo : 'Sin título'}
                </div>
                <div className="h-auto">
                  <span className="font-bold">{'Descripcion: '}</span>
                  {p.descripcion ? p.descripcion : 'sin descripción'}
                </div>
              </div>
            </div>
          ),
        )}
        {result &&
        result.temas.map(
          (
            p: {
              id: number
              imagen: string
              titulo: string
              descripcion: string
            },
            index: number,
          ) => (
            <div
              key={index}
              className="card max-w-[40rem] bg-base-100 shadow-xl m-2 border border-black"
            >
              <figure>
                {p.imagen ? (
                  <Image
                    src={'https://mercado.webapp.ar/images/' + p?.imagen}
                    alt="imagen"
                    width={0}
                    height={0}
                    sizes={'100vh'}
                    className="h-fit w-[12rem]"
                  />
                ) : (
                  <Image
                    src={defaultImage}
                    alt="imagen"
                    width={0}
                    height={0}
                    sizes={'100vh'}
                    className="h-fit w-[12rem]"
                  />
                )}
              </figure>
              <div className="card-body gap-0 px-1 text-center max-w-[12rem]">
                <h1 className="font-bold">
                  Tema ID: <span>{p.id}</span>
                </h1>
                <div className="h-auto">
                  <span className="font-bold">Tema: </span>
                  {p.titulo ? p.titulo : 'Sin título'}
                </div>
                <div className="h-auto">
                  <span className="font-bold">{'Descripcion: '}</span>
                  {p.descripcion ? p.descripcion : 'sin descripción'}
                </div>
              </div>
            </div>
          ),
        )}
    </div>
  )
}

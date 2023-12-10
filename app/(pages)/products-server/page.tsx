// import Clasificaciones from '@/app/(pages)/products-server/components/clasificaciones'
import Image from 'next/image'
import defaultImage from '@/app/assets/OIG-4.jpg'
import { unstable_noStore as noStore } from 'next/cache'

const dynamic = 'force-dynamic'
const revalidate = 0

async function getData() {
  noStore()
  const url = process.env.URL_API
  try {
    const res = await fetch(url + '/api/get-questions-statistics', {
      cache: 'no-store',
    })
    return res.json()
  } catch (error) {
    console.log(error)

    return null
  }
}

export default async function ClasificacionesPage() {
  const data = await getData()

  return (
    <div className="flex flex-wrap justify-center px-8 max-w-[90rem] mx-auto mt-8">
      {data &&
        data.examenes.map(
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
      {data &&
        data.temas.map(
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

export const metadata = {
  title: 'Productos Server',
}

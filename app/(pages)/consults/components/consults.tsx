import React from 'react'
import DeleteButton from './deleteButton'
import { RowDataPacket } from 'mysql2'

type Result = {
  id: number
  fullname: string
  consult: string
  email: string
}

export default function Consults({ result }: { result: RowDataPacket | null }) {
  return (
    <div className="flex flex-wrap justify-center px-8 max-w-[90rem] mx-auto mt-8">
      {result &&
        result.map((p: Result) => (
          <div
            key={p.id}
            className="card max-w-[40rem] bg-base-100 shadow-xl m-2 border border-black px-4"
          >
            <div className="card-body gap-0 px-1 text-start">
              <DeleteButton id={p.id} />
              <h1 className="font-bold mb-4">
                Consulta Id: <span>{p.id}</span>
              </h1>
              <div>
                <span className="font-bold">De: </span>
                {p.fullname ? p.fullname : 'Sin título'}
              </div>
              <div>
                <span className="font-bold">Email: </span>{' '}
                {p.email ? p.email : 'Sin título'}
              </div>
              <div>
                <span className="font-bold">{'Descripcion: '}</span>
                {p.consult ? p.consult : 'sin consulta'}
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

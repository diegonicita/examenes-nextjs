import Link from 'next/link'
import React from 'react'

export default function Plans() {
  return (
    <div className="pt-0">
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="font-bold text-3xl">Planes</h1>
          <span>Estos son nuestros planes, elige el que prefieras</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 items-start px-2 gap-8">
          <div className="flex flex-col gap-6 bg-base-200 rounded-box p-8">
            <div className="flex flex-col gap-4 text-center">
              <h2 className="text-xl">Gratis</h2>
              <h1 className="text-5xl font-bold">Free</h1>

              <span className="text-sm">Gratis para siempre</span>
            </div>

            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <i className="text-accent" />
                400 preguntas
              </div>

              <div className="flex gap-2 items-center">
                <i className="text-accent" />
                10 preguntas por examen
              </div>

              <div className="flex gap-2 items-center">
                <i className="text-accent" />1 pregunta por tema
              </div>
              <div className="flex gap-2 items-center">
                <i className="text-accent" />
                Incluye el Buscador de preguntas (limitado)
              </div>
            </div>

            <Link href="/register" className="btn btn-neutral">
              Registrate
            </Link>
          </div>

          <div className="flex flex-col gap-6 bg-base-200 rounded-box p-8 border border-accent shadow">
            <div className="flex flex-col gap-4 text-center">
              <h2 className="text-xl">Básico</h2>

              <h1 className="text-5xl font-bold">$10</h1>

              <span className="text-sm">
                Más de 6000 preguntas disponibles por durante 90 días
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <i className="text-accent" />
                Más de 6000 preguntas actualizadas
              </div>

              <div className="flex gap-2 items-center">
                <i className="text-accent" />
                Incluye el Buscador de preguntas
              </div>
            </div>

            <a href="https://ko-fi.com/s/13ecbecaee" className="btn btn-accent">
              Comprar en Ko-Fi
            </a>
          </div>
          <div className="flex flex-col gap-6 bg-base-200 rounded-box p-8">
            <div className="flex flex-col gap-4 text-center">
              <h2 className="text-xl">Ilimitado</h2>

              <h1 className="text-5xl font-bold">$20</h1>

              <span className="text-sm">Todo lo anterior</span>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <i className="text-accent" />
                Más de 6000 preguntas actualizadas
              </div>

              <div className="flex gap-2 items-center">
                <i className="text-accent" />
                Sin limite de tiempo
              </div>

              <div className="flex gap-2 items-center">
                <i className="text-accent" />
                Incluye el Buscador de preguntas
              </div>
            </div>
            <a
              href="https://ko-fi.com/s/6bedc37a8d"
              className="btn btn-neutral"
            >
              Comprar en Ko-Fi
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

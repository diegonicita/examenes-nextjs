import React from 'react'

export default function Plans() {
  return (
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
              <i className="fa-solid fa-check text-accent"></i>300 preguntas
            </div>

            <div className="flex gap-2 items-center">
              <i className="fa-solid fa-check text-accent"></i>
              10 preguntas por examen
            </div>

            <div className="flex gap-2 items-center">
              <i className="fa-solid fa-check text-accent"></i>1 pregunta por
              tema
            </div>
          </div>

          <a className="btn btn-neutral">Registrate</a>
        </div>

        <div className="flex flex-col gap-6 bg-base-200 rounded-box p-8 border border-accent shadow">
          <div className="badge badge-accent self-center badge-lg">
            Más Popular
          </div>

          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-xl">Básico</h2>

            <h1 className="text-5xl font-bold">$10</h1>

            <span className="text-sm">
              Más de 6000 preguntas disponibles por durante 90 días
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <i className="fa-solid fa-check text-accent"></i>Más de 6000
              preguntas actualizadas
            </div>

            <div className="flex gap-2 items-center">
              <i className="fa-solid fa-check text-accent"></i>
              Responde preguntas por tema
            </div>

            <div className="flex gap-2 items-center">
              <i className="fa-solid fa-check text-accent"></i>
              Incluye el Buscador de preguntas
            </div>
            <div className="flex gap-2 items-center">
              <i className="fa-solid fa-check text-accent"></i>
              Otros usuarios responden a tus consultas
            </div>
          </div>

          <a className="btn btn-accent">Registrate</a>
        </div>
        <div className="flex flex-col gap-6 bg-base-200 rounded-box p-8">
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-xl">Para Siempre</h2>

            <h1 className="text-5xl font-bold">$20</h1>

            <span className="text-sm">Todo lo anterior</span>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <i className="fa-solid fa-check text-accent"></i>
              Más de 6000 preguntas actualizadas
            </div>

            <div className="flex gap-2 items-center">
              <i className="fa-solid fa-check text-accent"></i>
              Sin limite de tiempo
            </div>

            <div className="flex gap-2 items-center">
              <i className="fa-solid fa-check text-accent"></i>
              Incluye el Buscador de preguntas
            </div>
            <div className="flex gap-2 items-center">
              <i className="fa-solid fa-check text-accent"></i>
              Médicos de nuestro equipo responden a tus consultas
            </div>
          </div>

          <a className="btn btn-neutral">Registrate</a>
        </div>
      </div>
    </div>
  )
}
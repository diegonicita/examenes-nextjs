import React from 'react'

export default function Faq() {
  return (
    <div className="flex flex-col items-center gap-10 p-6 mt-8">
      <h1 className="text-3xl font-bold">
        <i className="text-primary" />
        Preguntas frecuentes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="font-medium text-lg italic text-primary">
            ¿ Puedo practicar sin registrarme ?
          </h2>

          <span>
            No, por el momento no puedes practicar sin registrarte. Si te registras puedes acceder a más de 400 preguntas sin costo alguno. No tienes que ingresar datos de tus tarjetas de crédito.
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-medium text-lg italic text-primary">
            ¿ Se actualizan las preguntas y los exámenes ?
          </h2>

          <span>
            Si, periodicamente estamos agregando mas y mas preguntas. Nuestro objetivo es que tengas disponibles los ultimos examenes de España, Argentina, Peru y Mexico. Estamos trabajando en eso.
          </span>
        </div>
        <div className="flex flex-col">
          <h2 className="font-medium text-lg italic text-primary">
            ¿ Puedo mejorar mi plan ?
          </h2>

          <span>
            Si, hay 2 tipos de planes. Básico e Ilimitado. Se diferencian en el tiempo que dura tu suscripcion a nuestro sitio web. Si compraste el "Basico" y quieres pasarte al "Ilimitado" puedes enviarnos una consulta y nos contactaremos a la brevedad.
          </span>
        </div>
      </div>
    </div>
  )
}

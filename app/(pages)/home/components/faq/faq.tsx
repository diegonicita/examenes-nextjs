import React from 'react'

export default function Faq() {
  return (
    <div className="flex flex-col items-center gap-10 p-6 mt-8">
      <h1 className="text-3xl font-bold">
        <i className="fa-solid fa-circle-question text-primary"></i>
        Preguntas frecuentes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="font-medium text-lg italic text-primary">
            ¿ Puedo cancelar mi plan ?
          </h2>

          <span>
            Yes, you can cancel anytime. No questions are asked while you cancel
            but we would highly appreciate if you will give us some feedback.
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-medium text-lg italic text-primary">
            ¿ Se actualizan las preguntas y los exámenes ?
          </h2>

          <span>
            Once your team signs up for a subscription plan. This is where we
            sit down, grab a cup of coffee and dial in the details.
          </span>
        </div>
        <div className="flex flex-col">
          <h2 className="font-medium text-lg italic text-primary">
            ¿ Puedo mejorar mi plan ?
          </h2>

          <span>
            There may be times when you need to upgrade your license from the
            original type you purchased and we have a solution that ensures you
            can apply your original purchase cost to the new license purchase.
          </span>
        </div>
      </div>
    </div>
  )
}

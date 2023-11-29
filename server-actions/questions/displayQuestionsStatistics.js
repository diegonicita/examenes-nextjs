'use server'
import React from 'react'
import executeQuery from '@/server-actions/helpers/mysqldb'

export default async function DisplayQuestionsStatistics() {
  const result1 = await executeQuery(
    'select count(*) as total from preguntas',
    [],
  )
  const result2 = []

  for (let i = 0; i < 10; i++) {
    const r = await executeQuery(
      'select count(*) as total from preguntas where examen = ?',
      [i],
    )
    result2.push(r[0].total)
  }

  return (
    <>
      <div className="flex flex-wrap justify-center px-8 max-w-[90rem] mx-auto my-8">
        Preguntas en la Base de Datos: {result1[0].total} preguntas
      </div>
      {result2.map((r, i) => (
        <div
          key={i}
          className="flex flex-wrap justify-center px-8 max-w-[90rem] mx-auto my-8"
        >
          Preguntas del examen {i} en la Base de Datos: {r} preguntas
        </div>
      ))}
    </>
  )
}

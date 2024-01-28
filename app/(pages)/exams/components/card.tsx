'use client'
import React from 'react'
import Image from 'next/image'
import type { ExamType } from '@/app/models/Exam'
import Link from 'next/link'
/* Instruments */
import { useSelector, selectAllQuestion } from '@/app/lib/redux'

export default function Card({ item }: { item: ExamType }) {
  const answeredArray = useSelector((state) => selectAllQuestion(state))

  const answered = answeredArray.filter(
    (answeredQuestion) => answeredQuestion.examenId === item.id,
  ).length
  const corrects = answeredArray.filter(
    (answeredQuestion) =>
      answeredQuestion.examenId === item.id && answeredQuestion.correct,
  ).length
  const total = item.total
  const percentCorrect = answered !== 0 ? ((corrects * 100) / answered).toFixed(1) : 0
  const percentNotCorrect =
    answered !== 0 ? (((answered - corrects) * 100) / answered).toFixed(1) : 0

  return (
    <Link href={`/exams/${item.id}`}>
      <div className="btn btn-ghost h-full p-0 border-0 hover:bg-white">
        <div className="card w-80 sm:w-60 md:w-40 bg-base-100 shadow-xl m-2 border border-black indicator hover:border-2 hover:shadow-2xl h-auto pb-4">
          <span className="indicator-item badge badge-primary font-bold text-sm indicator-bottom indicator-end pr-2 mr-6 mb-1">
            {item?.total}
          </span>
          <figure className="pt-2">
            {item.imagen ? (
              <Image
                src={
                  'https://mercado.webapp.ar/images_medicina/' + item?.imagen
                }
                alt="imagen"
                width={0}
                height={0}
                sizes={'100vh'}
                className="h-auto w-80 sm:w-60 lg:w-32"
              />
            ) : (
              <Image
                src={'https://mercado.webapp.ar/images_medicina/medicina-1.png'}
                alt="imagen"
                width={0}
                height={0}
                sizes={'100vh'}
                className="h-auto w-80 sm:w-60 lg:w-28"
              />
            )}
          </figure>
          <div className="text-lg text-center flex-1">
            <div className="h-full flex flex-col items-center p-1">
              <div className="max-w-[10rem] mx-auto mb-2 text-sm text-pretty">
                {item.titulo ? item.titulo : 'Sin título'}
                <br />({item.pais})
              </div>             
              <div className="text-xs text-success">
                Correctas: {corrects} ({percentCorrect}%)
              </div>
              <div className="text-xs text-error">
                Incorrectas: {answered - corrects} ({percentNotCorrect}%)
              </div>
            </div>
            <div className="h-auto">
              <span className="font-bold"></span>
              {/* {item.descripcion ? item.descripcion : 'sin descripción'} */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

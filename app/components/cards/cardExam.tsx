'use client'
import React from 'react'
import Image from 'next/image'
import type { ExamType } from '@/app/models/Exam'
import Link from 'next/link'
import { useSelector, selectAllQuestion } from '@/app/lib/redux'
import { getStatistics } from './helper/getStatistic'
import useHasMounted from '@/app/hooks/useHasMounted'

export default function CardExam({
  item,
  year,
  link,
  total,
  userId,
}: {
  item: ExamType
  year: number | undefined
  link: string
  total: number
  userId: number | null
}) {
  const answeredArray = useSelector((state) => selectAllQuestion(state))
  const _userId = userId ? userId : 0
  const { answered, corrects, percentCorrect, percentNotCorrect } =
    getStatistics({
      data: answeredArray.filter((item) => item.userId === _userId),
      year: year,
      id: item.id,
    })

  return (
    <>
      {useHasMounted() && (
        <Link href={link}>
          <div className="btn btn-ghost h-full p-0 border-0 hover:bg-white">
            <div className="card w-80 sm:w-60 md:w-40 bg-base-100 shadow-xl m-2 border border-black indicator hover:border-2 hover:shadow-2xl h-auto pb-4">
              <span className="indicator-item badge badge-primary font-bold text-sm indicator-bottom indicator-end pr-2 mr-6 mb-1">
                {total}
              </span>
              <figure className="pt-2">
                {item.imagen ? (
                  <Image
                    src={
                      'https://mercado.webapp.ar/images_medicina/' +
                      item?.imagen
                    }
                    alt="imagen"
                    width={0}
                    height={0}
                    sizes={'100vh'}
                    className="h-auto w-80 sm:w-60 lg:w-32"
                  />
                ) : (
                  <Image
                    src={
                      'https://mercado.webapp.ar/images_medicina/medicina-1.png'
                    }
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
                    {!year && (
                      <>
                        {item.titulo ? item.titulo : 'Sin título'} <br /> (
                        {item.pais})
                      </>
                    )}
                    {year && <>Año {year}</>}
                  </div>
                  <div className="text-xs text-success">
                    Correctas: {corrects} ({percentCorrect}%)
                  </div>
                  <div className="text-xs text-error">
                    Incorrectas: {answered - corrects} ({percentNotCorrect}%)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  )
}

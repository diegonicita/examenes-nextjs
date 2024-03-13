'use client'
import { ExamType } from '@/app/models/Exam'
import React from 'react'
import Image from 'next/image'
import { useSelector, selectAllQuestion } from '@/app/lib/redux'
import { getStatistics } from './helper/getStatistic'
import useHasMounted from '@/app/hooks/useHasMounted'
import Link from 'next/link'

const CardExam2 = ({
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
}) => {
  const answeredArray = useSelector((state) => selectAllQuestion(state))
  const _userId = userId ? userId : 0
  const { answered, corrects, percentCorrect, percentNotCorrect } =
    getStatistics({
      data: answeredArray.filter((item) => item.userId === _userId),
      year: year,
      id: item.id,
    })

  return (
    <div className="flex flex-col gap-2 bg-base-200 rounded-box p-8">
      {useHasMounted() && (
        <>
          <div className="flex flex-col text-center">
            <h2 className="text-xl ">
              {item.titulo ? item.titulo : 'Sin título'}
            </h2>
            {!year && (
              <figure className="flex justify-center">
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
                    className="h-auto w-full max-w-40"
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
                    className="h-auto w-full max-w-40"
                  />
                )}
              </figure>
            )}
            {year && <h2 className="text-4xl font-bold p-4">{year}</h2>}
            {!year && <span className="text-sm">{item.pais}</span>}
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="flex items-center">{total} preguntas</div>
          </div>

          <Link
            href={{
              pathname: link,
              query: { page: '1' },
            }}
            className="btn btn-neutral"
          >
            Seleccionar
          </Link>
        </>
      )}
    </div>
  )
}

export default CardExam2

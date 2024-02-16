'use client'
import React from 'react'
import Image from 'next/image'
import type { ExamType } from '@/app/models/Exam'
import Link from 'next/link'
import { getStatistics } from '@/app/components/cards/helper/getStatistic'
import useHasMounted from '@/app/hooks/useHasMounted'
import {
  selectAllQuestion,
  useSelector,
  useDispatch,
  questionSlice,
  selectQuestion,
} from '@/app/lib/redux'

export default function Card({
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
  userId: any
}) {
  const dispatch = useDispatch()
  const answeredArray = useSelector((state) => selectAllQuestion(state))
  const _userId = userId ? userId : 0
  const { answered, corrects, percentCorrect, percentNotCorrect } =
    getStatistics({
      data: answeredArray.filter((item) => item.userId === _userId),
      year: year,
      id: item.id,
    })
  const handleDeleteExam = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const target = event.currentTarget as HTMLDivElement
    dispatch(
      questionSlice.actions.deleteQuestionsByExamenId({
        examenId: Number(target.id),
        userId: Number(_userId),
      }),
    )
  }

  return (
    <>
      {useHasMounted() && (
        <div className="card w-80 sm:w-60 md:w-40 bg-base-100 shadow-xl m-2 border border-black indicator h-auto pb-4">
          <span className="indicator-item badge badge-primary font-bold text-sm indicator-bottom indicator-end pr-2 mr-6 mb-1">
            {answered}/{total}
          </span>
          {answered > 0 && (
            <div className="indicator-item text-sm indicator-top indicator-end">
              <div
                className="tooltip tooltip-close tooltip-right hover:tooltip-open"
                data-tip="Borrar Progreso"
              >
                <div
                  id={item.id.toString()}
                  className="btn btn-sm btn-circle btn-error"
                  onClick={handleDeleteExam}
                >
                  <svg
                    fill="#000000"
                    height="20px"
                    width="20px"
                    version="1.1"
                    id="Layer_1"
                    viewBox="0 0 290 350"
                  >
                    <path
                      d="M265,60h-30h-15V15c0-8.284-6.716-15-15-15H85c-8.284,0-15,6.716-15,15v45H55H25c-8.284,0-15,6.716-15,15s6.716,15,15,15
			h5.215H40h210h9.166H265c8.284,0,15-6.716,15-15S273.284,60,265,60z M190,60h-15h-60h-15V30h90V60z"
                    />
                    <path d="M40,275c0,8.284,6.716,15,15,15h180c8.284,0,15-6.716,15-15V120H40V275z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
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
      )}
    </>
  )
}

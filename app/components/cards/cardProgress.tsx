'use client'
import type React from 'react'
import type { ExamTypeFromApi } from '@/app/models/Exam'
import { getStatistics } from '@/app/components/cards/helper/getStatistic'
import useHasMounted from '@/app/hooks/useHasMounted'
import TrashIcon from '@/app/assets/icons/trashIcon'
import {
  selectAllQuestion,
  useSelector,
  useDispatch,
  questionSlice,
} from '@/app/lib/redux'

export default function Card({
  item,
  year,
  link,
  total,
  userId,
}: {
  item: ExamTypeFromApi
  year: number | undefined
  link: string
  total: number
  userId: number | null
}) {
  const dispatch = useDispatch()
  const answeredArray = useSelector((state) => selectAllQuestion(state))
  const _userId = userId ? userId : 0
  const { answered, corrects, percentCorrect, percentNotCorrect } =
    getStatistics({
      data: answeredArray.filter(
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        (item: { userId: any }) => item.userId === _userId,
      ),
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
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                <div
                  id={item.id.toString()}
                  className="btn btn-sm btn-circle btn-error"
                  onClick={handleDeleteExam}
                >
                  <TrashIcon />
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

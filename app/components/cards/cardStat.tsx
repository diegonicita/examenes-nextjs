'use client'
import React from 'react'
import useHasMounted from '@/app/hooks/useHasMounted'
import { selectAllQuestion, useSelector, useDispatch } from '@/app/lib/redux'
import RayIcon from '@/app/components/cards/icons/rayIcon'

const CardStat = ({ userId }: { userId: number | null }) => {
  const _userId = userId ? userId : 0
  const answeredArray = useSelector((state) => selectAllQuestion(state))
  const incorrects = answeredArray.filter(
    (item) => item.correct === false && item.userId === _userId,
  ).length
  const corrects = answeredArray.filter(
    (item) => item.correct && item.userId === _userId,
  ).length

  return (
    <>
      {useHasMounted() && (
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-primary">
              <RayIcon />
            </div>
            <div className="stat-title">Respondidas</div>
            <div className="stat-value text-primary">
              {corrects + incorrects}
            </div>
            <div className="stat-desc">21% más que el mes pasado</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-success">
              <RayIcon />
            </div>
            <div className="stat-title">Correctas</div>
            <div className="stat-value text-success">{corrects}</div>
            <div className="stat-desc">23% más que el mes pasado</div>
          </div>
        </div>
      )}
    </>
  )
}

export default CardStat
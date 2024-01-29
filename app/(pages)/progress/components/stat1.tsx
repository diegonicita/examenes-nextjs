'use client'
import React from 'react'
import useHasMounted from '@/app/hooks/useHasMounted'
import {
  selectAllQuestion,
  useSelector,
  useDispatch,
  questionSlice,
  selectQuestion,
} from '@/app/lib/redux'

const Stat1 = () => {
  const dispatch = useDispatch()
  const answeredArray = useSelector((state) => selectAllQuestion(state))

  const corrects = answeredArray.filter((item) => item.correct).length

  return (
    <>
      {useHasMounted() && (
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Respondidas</div>
            <div className="stat-value text-primary">
              {answeredArray.length}
            </div>
            <div className="stat-desc">21% más que el mes pasado</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
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

export default Stat1

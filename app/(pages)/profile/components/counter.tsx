'use client'

/* Core */
import { useState } from 'react'

/* Instruments */
import {
  useSelector,
  useDispatch,
  counterSlice,
  selectCount,
  incrementAsync,
  incrementIfOddAsync,
} from '@/app/lib/redux'

export default function Counter() {
  const dispatch = useDispatch()
  const count = useSelector(selectCount)
  const [incrementAmount, setIncrementAmount] = useState(2)

  return (
    <div className="flex flex-col mt-8 border p-2">
      <div className="text-primary-base">
        Counter Slice:
      </div>
      <div className="flex gap-3 items-center flex-col mt-4">
        <button
          className="btn btn-accent btn-sm"
          aria-label="Decrement value"
          onClick={() => dispatch(counterSlice.actions.decrement())}
        >
          ➖
        </button>
        <span className="text-2xl">{count}</span>
        <button
          className="btn btn-accent btn-sm"
          aria-label="Increment value"
          onClick={() => dispatch(counterSlice.actions.increment())}
        >
          ➕
        </button>
        <input
          className="text-center input input-bordered w-16 max-w-xs h-auto"
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(Number(e.target.value ?? 0))}
        />
        <button
          className="btn btn-accent btn-sm"
          onClick={() =>
            dispatch(counterSlice.actions.incrementByAmount(incrementAmount))
          }
        >
          Add Amount
        </button>
        <button
          className="btn btn-accent btn-sm"
          onClick={() => dispatch(incrementAsync(incrementAmount))}
        >
          Add Async
        </button>
        <button
          className="btn btn-accent btn-sm"
          onClick={() => dispatch(incrementIfOddAsync(incrementAmount))}
        >
          Add If Odd
        </button>
      </div>
    </div>
  )
}

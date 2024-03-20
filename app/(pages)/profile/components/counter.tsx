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
    <div className="flex mt-8 border p-2">
      <div className="flex flex-wrap gap-3 items-center justify-center">
        <button
          className="btn btn-accent btn-sm"
          aria-label="Decrement value"
          onClick={() => dispatch(counterSlice.actions.decrement())}
          type="button"
        >
          ➖
        </button>
        <span className="text-2xl">{count}</span>
        <button
          className="btn btn-accent btn-sm"
          aria-label="Increment value"
          onClick={() => dispatch(counterSlice.actions.increment())}
          type="button"
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
          type="button"
        >
          Add Amount
        </button>
        <button
          className="btn btn-accent btn-sm"
          onClick={() => dispatch(incrementAsync(incrementAmount))}
          type="button"
        >
          Add Async
        </button>
        <button
          className="btn btn-accent btn-sm"
          onClick={() => dispatch(incrementIfOddAsync(incrementAmount))}
          type="button"
        >
          Add If Odd
        </button>
      </div>
    </div>
  )
}

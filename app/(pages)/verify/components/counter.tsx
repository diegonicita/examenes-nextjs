'use client'

/* Core */
import { useState } from 'react'

/* Instruments */
import {
  counterSlice,
  useSelector,
  useDispatch,
  selectCount,
  incrementAsync,
  incrementIfOddAsync,
  messageSlice,
  selectMessage,
} from '@/app/lib/redux'

export default function Counter() {
  const dispatch = useDispatch()
  const count = useSelector(selectCount)
  const msg = useSelector(selectMessage)
  const [incrementAmount, setIncrementAmount] = useState(2)

  return (
    <div className="bg-base-300 text-primary-base p-2 max-w-[60rem] mx-auto mt-8">
      <div>
        Data from Message Slice: {msg}
      </div>
      <div className="flex gap-4 m-4">
        <button
          className="btn btn-accent"
          onClick={() => dispatch(messageSlice.actions.changeMessage('Chau'))}
        >
          Chau
        </button>
        <button
          className="btn btn-accent"
          onClick={() => dispatch(messageSlice.actions.changeMessage('Hola'))}
        >
          Hola
        </button>
      </div>
      <div className="p-2 bg-base-300 text-primary-base">
        Data from Counter Slice:{' '}
      </div>
      <div className="flex gap-2 m-4">
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
          className="input input-bordered w-full max-w-xs h-auto"
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

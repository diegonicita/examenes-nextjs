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
} from '@/lib/redux'
import styles from './counter.module.css'

export const Counter = () => {
  const dispatch = useDispatch()
  const count = useSelector(selectCount)
  const msg = useSelector(selectMessage)
  const [incrementAmount, setIncrementAmount] = useState(2)

  return (
    <div>
      <div className="bg-red-50">Data from Message Slice: {msg}</div>
      <div className="flex gap-4 m-4">
        <button
          className={styles.button}
          onClick={() => dispatch(messageSlice.actions.changeMessage('Chau'))}
        >
          Chau
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(messageSlice.actions.changeMessage('Hola'))}
        >
          Hola
        </button>
      </div>
      <div className="bg-blue-50 mt-4">Data from Counter Slice: </div>
      <div className={styles.row}>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(counterSlice.actions.decrement())}
        >
          ➖
        </button>
        <span>{count}</span>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(counterSlice.actions.increment())}
        >
          ➕
        </button>
      </div>
      <div>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(Number(e.target.value ?? 0))}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(counterSlice.actions.incrementByAmount(incrementAmount))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementAmount))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOddAsync(incrementAmount))}
        >
          Add If Odd
        </button>
      </div>
    </div>
  )
}

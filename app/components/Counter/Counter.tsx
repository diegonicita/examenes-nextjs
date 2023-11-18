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
  selectMessage
} from '@/lib/redux'
import styles from './counter.module.css'

export const Counter = () => {
  const dispatch = useDispatch()
  const count = useSelector(selectCount)
  const msg = useSelector(selectMessage)
  const [incrementAmount, setIncrementAmount] = useState(2)

  return (
    <div className="flex flex-col bg-blue-400">
      <div className={styles.row}>Message: {msg}</div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(counterSlice.actions.decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(counterSlice.actions.increment())}
        >
          +
        </button>
      </div>
      <div className="flex gap-2 flex-col bg-red-300">
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
        <button
          className={styles.button}
          onClick={() => dispatch(messageSlice.actions.changeMessage("Chau"))}
        >
          Msg = Chau
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(messageSlice.actions.changeMessage("Hola"))}
        >
          Msg = Hola
        </button>
      </div>
    </div>
  )
}

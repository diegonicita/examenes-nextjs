/* Instruments */
import { counterSlice, messageSlice } from './slices'

export const reducer = {
  counter: counterSlice.reducer,
  message: messageSlice.reducer,
}

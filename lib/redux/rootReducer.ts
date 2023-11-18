/* Instruments */
import { counterSlice, messageSlice } from './slices'
import { pokemonApi } from '../../services/pokemon'

export const reducer = {
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  counter: counterSlice.reducer,
  message: messageSlice.reducer,
}

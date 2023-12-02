/* Instruments */
import { counterSlice, messageSlice, userSlice } from './slices'
import { pokemonApi } from '../services/pokemon'
import { choiceApi } from '../services/choice'

export const reducer = {
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  [choiceApi.reducerPath]: choiceApi.reducer,
  counter: counterSlice.reducer,
  message: messageSlice.reducer,
  user: userSlice.reducer,
}

/* Instruments */
import type { ReduxState } from '@/app/lib/redux'

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: ReduxState) => state.counter.value
export const selectMessage = (state: ReduxState) => state.message.value
export const selectUser = (state: ReduxState) => state.user.username
export const selectEmail = (state: ReduxState) => state.user.email
export const selectToken = (state: ReduxState) => state.user.token

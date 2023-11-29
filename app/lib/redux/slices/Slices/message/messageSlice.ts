import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: MessageSliceState = {
  value: 'Hola',
  status: 'idle',
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    changeMessage: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

/* Types */
export interface MessageSliceState {
  value: string
  status: 'idle' | 'loading' | 'failed'
}

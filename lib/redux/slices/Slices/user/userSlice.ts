import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: UserSliceState = {
  fullname: null,
  email: null,
  token: null,
  status: 'idle',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<PayloadType>) => {
      state.fullname = action.payload.fullname
      state.email = action.payload.email
      state.token = action.payload.token
      state.status = action.payload.status
    },
  },
})

/* Types */
export interface UserSliceState {
  fullname: string | null
  email: string | null
  token: string | null
  status: 'idle' | 'loading' | 'failed'
}

type PayloadType = {
  fullname: string | null
  email: string | null
  token: string | null
  status: 'idle' | 'loading' | 'failed'
}

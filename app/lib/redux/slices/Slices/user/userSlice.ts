import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { UserType } from '@/app/models/User'
import type { ReduxState } from '@/app/lib/redux'

const initialState: UserType = {
  id: null,
  role: null,
  username: null,
  email: null,  
  verify: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<UserType>) => {
      state.username = action.payload.username
      state.email = action.payload.email
    },
    logout: (state) => {
      state.username = null
      state.email = null
    },
  },
})

export const selectUser = (state: ReduxState) => state.user.username
export const selectEmail = (state: ReduxState) => state.user.email

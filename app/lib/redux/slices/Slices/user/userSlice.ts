import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type UserType } from '@/app/models/User'

const initialState: UserType = {
  username: null,
  email: null,
  token: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<UserType>) => {
      state.username = action.payload.username
      state.email = action.payload.email
      state.token = action.payload.token
    },
    logout: (state) => {
      state.username = null
      state.email = null
      state.token = null
    },
  },
})

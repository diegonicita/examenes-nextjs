import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type User } from '@/app/models/User'

const initialState: User = {
  username: null,
  email: null,
  token: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<User>) => {
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

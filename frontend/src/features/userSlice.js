import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: "",
  email : "",
  first_name: "",
  last_name: "",

}

export const userSlice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.username = action.payload.username
      state.email = action.payload.email
      state.first_name = action.payload.first_name
      state.last_name = action.payload.last_name
    },
    unsetUserInfo: (state, action) => {
      state.username = action.payload.username
      state.email = action.payload.email
      state.first_name = action.payload.first_name
      state.last_name = action.payload.last_namess
    },
  }
})

export const { setUserInfo, unsetUserInfo } = userSlice.actions

export default userSlice.reducer
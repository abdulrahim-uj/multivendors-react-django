import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { UserAuthApi } from '../services/UserAuthApi';
import authReducer from '../features/authSlice'
import userReducer from '../features/userSlice'
import cartReducer from '../features/cartSlice'



export const store = configureStore({
  reducer: {
    [UserAuthApi.reducerPath]: UserAuthApi.reducer,
    auth: authReducer,
    user: userReducer,
    cart : cartReducer,
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserAuthApi.middleware),
})

setupListeners(store.dispatch)

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setUserCart: (state, action) => {
      state.cart = action.payload.cart;
    },

    unSetUserCart: (state) => {
      state.cart = action.payload.cart;
    },
  },
});

export const { setUserCart, unSetUserCart } = cartSlice.actions;
export default cartSlice.reducer;

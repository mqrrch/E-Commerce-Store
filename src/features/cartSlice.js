import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
        },
    }
})

export const { setIsCartOpen } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
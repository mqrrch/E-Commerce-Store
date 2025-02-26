import { createSlice } from "@reduxjs/toolkit";
import { 
    addCartItemAsync,
    removeCartItemAsync,
    updateCartQuantityAsync,
 } from "./asyncThunks";

const initialState = {
    cartItems: [],
    status: 'idle',
    error: null,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCartItemAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addCartItemAsync.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(addCartItemAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(removeCartItemAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeCartItemAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cartItems = state.cartItems.filter(item => item.itemId !== action.payload);
            })
            .addCase(removeCartItemAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(updateCartQuantityAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCartQuantityAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.cartItems.findIndex(item => item.id === action.payload.id);
                if (index !== -1){
                    state.cartItems[index].itemQuantity = action.payload.itemQuantity;
                }
            })
            .addCase(updateCartQuantityAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
})

export const { setCartItems } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
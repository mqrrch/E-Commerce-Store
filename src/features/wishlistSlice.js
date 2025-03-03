import { createSlice } from "@reduxjs/toolkit";
import { addWishlistItemAsync, removeWishlistItemAsync } from "./wishlistAsyncThunks";

const initialState = {
    wishlistItems: [],
    status: 'idle',
    error: null,
};

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        setWishlistItems: (state, action) => {
            state.wishlistItems = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addWishlistItemAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addWishlistItemAsync.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(addWishlistItemAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(removeWishlistItemAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeWishlistItemAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.wishlistItems = state.wishlistItems.filter(item => item.itemId !== action.payload);
            })
            .addCase(removeWishlistItemAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
})

export const { setWishlistItems } = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: "Select a Category",
}

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        }
    }
})

export const { setCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
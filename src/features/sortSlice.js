import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sort: "Select a Sort",
}

export const sortSlice = createSlice({
    name: "sort",
    initialState,
    reducers: {
        setSort: (state, action) => {
            state.sort = action.payload;
        }
    }
})

export const { setSort } = sortSlice.actions;
export const sortReducer = sortSlice.reducer;
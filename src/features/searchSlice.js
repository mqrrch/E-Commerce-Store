import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchName: "",
}

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.searchName = action.payload;
        },
        clearSearch: (state) => {
            state.searchName = "";
        }
    }
})

export const { setSearch, clearSearch } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
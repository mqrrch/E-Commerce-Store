import { configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "../features/loadingSlice";
import { searchReducer } from "../features/searchSlice";
import { categoryReducer } from "../features/categorySlice";
import { sortReducer } from "../features/sortSlice";

export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        search: searchReducer,
        category: categoryReducer,
        sort: sortReducer,
    },
});

export default store;
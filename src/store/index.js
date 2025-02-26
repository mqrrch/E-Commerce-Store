import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../features/userSlice";
import { loadingReducer } from "../features/loadingSlice";
import { searchReducer } from "../features/searchSlice";
import { categoryReducer } from "../features/categorySlice";
import { sortReducer } from "../features/sortSlice";
import { cartReducer } from "../features/cartSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
        loading: loadingReducer,
        search: searchReducer,
        category: categoryReducer,
        sort: sortReducer,
    },
});

export default store;
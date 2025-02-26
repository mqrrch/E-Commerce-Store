import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uid: null,
    displayName: null,
    email: null,
    phoneNumber: null,
    photoURL: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log(action)
            state.uid = action.payload.uid;
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.phoneNumber = action.payload.phoneNumber;
            state.photoURL = action.payload.photoURL;
        },
        clearUser: (state) => {
            state.uid = null;
            state.displayName = null;
            state.email = null;
            state.phoneNumber = null;
            state.photoURL = null;
        },
    }
})

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
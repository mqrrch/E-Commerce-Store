import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const addWishlistItemAsync = createAsyncThunk(
    'wishlist/addWishlistItemAsync',
    async (itemData, { getState, rejectWithValue }) => {
        const uid = getState().user.uid
        try {
            const docRef = await addDoc(collection(db, 'wishlist'), {
                ...itemData,
                uid: uid,
            });
            return { id: docRef.id, ...itemData, uid };
        } catch(err) {
            console.log(err.message)
            return rejectWithValue(err.message);
        }
    }
)

export const removeWishlistItemAsync = createAsyncThunk(
    'wishlist/removeWishlistItemAsync',
    async (itemData, { rejectWithValue }) => {
        try {
            await deleteDoc(doc(db, 'wishlist', itemData.id));
            return itemData.id;
        } catch(err){
            return rejectWithValue(err.message);
        }
    }
)
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const addCartItemAsync = createAsyncThunk(
    'cart/addCartItemAsync',
    async (itemData, { getState, rejectWithValue }) => {
        const uid = getState().user.uid
        try {
            const q = query(
                collection(db, 'cart'),
                where('uid', '==', uid),
                where('itemId', '==', itemData.itemId)
            );
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty){
                const docSnap = querySnapshot.docs[0];
                const existingData = docSnap.data();
                const newQuantity = (existingData.itemQuantity || 0) + (itemData.itemQuantity || 1);
                await updateDoc(docSnap.ref, { itemQuantity: newQuantity });
                return { id: docSnap.id, ...itemData, uid, itemQuantity: newQuantity }
            } else{
                const docRef = await addDoc(collection(db, 'cart'), {
                    ...itemData,
                    uid: uid,
                });
                return { id: docRef.id, ...itemData, uid };
            }
        } catch(err) {
            console.log(err.message)
            return rejectWithValue(err.message);
        }
    }
)

export const removeCartItemAsync = createAsyncThunk(
    'cart/removeCartItemAsync',
    async (itemData, { rejectWithValue }) => {
        try {
            await deleteDoc(doc(db, 'cart', itemData.id));
            return itemData.id;
        } catch(err){
            return rejectWithValue(err.message);
        }
    }
)

export const updateCartQuantityAsync = createAsyncThunk(
    'cart/updateCartQuantityAsync',
    async (itemData, { rejectWithValue }) => {
        try {
            const docRef = doc(db, 'cart', itemData.id);
            await updateDoc(docRef, { itemQuantity: itemData.itemQuantity });
            return { id: itemData.id, itemQuantity: itemData.itemQuantity };
        } catch (err){
            return rejectWithValue(err.message);
        }
    }
)
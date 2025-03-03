import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import useFirestoreQuery from "../../hooks/useFirestoreQuery";
import { where } from "firebase/firestore";
import { setCartItems } from "../../features/cartSlice";
import { setWishlistItems } from "../../features/wishlistSlice";
import { useDispatch } from "react-redux";

export default function MainLayout() {
    const dispatch = useDispatch();

    // Get cart items from the database of the user
    const cart = () => {
        useFirestoreQuery({
            collectionName: 'cart',
            queryConditions: (user) => [where('uid', '==', user.uid)],
            onDataReceived: (docs) => {
                const cartItems = docs.map(doc => ({...doc.data(), id: doc.id}));
                dispatch(setCartItems(cartItems));
            },
            onError: (err) => {
                console.error(err);
            },
            dependencies: [],
        })
    }

    cart();

    // Get wishlist items from the database of the user
    const wishlist = () => {
        useFirestoreQuery({
            collectionName: 'wishlist',
            queryConditions: (user) => [where('uid', '==', user.uid)],
            onDataReceived: (docs) => {
                const wishlistItems = docs.map(doc => ({...doc.data(), id: doc.id}));
                dispatch(setWishlistItems(wishlistItems));
            },
            onError: (err) => {
                console.error(err);
            },
            dependencies: [],
        })
    }

    wishlist();

    return (
        <>
            <div className='fixed top-0 left-0 w-full h-screen z-[-2] bg-slate-200'></div>
            <Navbar />
            <div className="pt-18 pb-6 px-5 flex flex-col gap-4 max-w-[1600px] mx-auto">
                <Outlet />
            </div>
        </>
    );
  }
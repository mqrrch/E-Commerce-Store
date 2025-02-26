import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import EmptyCartPopup from "./EmptyCartPopup";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../features/cartSlice";
import { db } from "../../firebase";
import {
    collection,
    query,
    where,
    onSnapshot,
} from "firebase/firestore";

export default function Cart(){
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCartLoading, setIsCartLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const cartItems = useSelector(state => state.cart.cartItems);

    useEffect(() => {
        if (!user) return;
        setIsCartLoading(true);
        const q = query(
            collection(db, "cart"),
            where('uid', '==', user.uid)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const cartsArr = [];
            querySnapshot.forEach(doc => {
                cartsArr.push({...doc.data(), id: doc.id});
            });
            dispatch(setCartItems(cartsArr));
            setIsCartLoading(false);
        }, err => {
            console.error(err)
            setIsCartLoading(false);
        });
        return unsubscribe;
    }, [user, dispatch]);

    const changePage = () => {
        navigate('/cart')
    }
    
    return(
        <>
            <a className="text-2xl cursor-pointer" onClick={cartItems && cartItems.length > 0 ? changePage : () => setIsCartOpen(true)}>
                <i className='bx bx-cart'></i>
            </a>
            <div 
                id="menu-overlay" 
                onClick={() => setIsCartOpen(false)} 
                className={`fixed top-0 left-0 h-screen w-full bg-black transition-opacity duration-500 z-[3] ${isCartOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
            ></div>
            <div className={`fixed flex flex-col justify-center items-center gap-4 bottom-0 left-0 w-full transition-all duration-500 bg-white z-[5] h-[80%] p-8 ${isCartOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                <EmptyCartPopup />
            </div>
        </>
    )
}
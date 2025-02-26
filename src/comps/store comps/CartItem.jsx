import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { removeCartItemAsync, updateCartQuantityAsync } from "../../features/asyncThunks";
import { Link } from "react-router-dom";

export default function CartItem({ id, itemId, itemTitle, itemPrice, itemQuantity, itemImage}){
    const [quantity, setQuantity] = useState(itemQuantity);
    const dispatch = useDispatch();

    useEffect(() => {
        setQuantity(itemQuantity);
    }, [itemQuantity])

    const increment = () => {
        dispatch(updateCartQuantityAsync({ id: id, itemQuantity: itemQuantity + 1}))
    }
    
    const decrement = () => {
        if(itemQuantity > 1){
            dispatch(updateCartQuantityAsync({ id: id, itemQuantity: itemQuantity - 1}))
        }
    }

    const handleChange = (value) => {
        // If theres a change from the input, it sets the value to number instead of string
        const intValue = Number(value);
        setQuantity(intValue);
        // Change the count if its more than 1, but if its less than count then set it to 1
        // setQuantity(intValue < 1 ? 1 : intValue);
    }

    const handleBlur = () => {
        if(quantity <= 0) {
            dispatch(updateCartQuantityAsync({ id: id, itemQuantity: 1 }));
            setQuantity(1)
        } else{
            dispatch(updateCartQuantityAsync({ id: id, itemQuantity: quantity }));
        }
    }
    
    const handleRemove = () => {
        dispatch(removeCartItemAsync({ id: id }))
    }

    return (
        <div className="flex relative gap-4 w-[280px] h-[100px] bg-white p-2 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
            <div
                onClick={handleRemove} 
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 flex justify-center items-center text-center rounded-full cursor-pointer"
            >
                <i className="bx bx-x ml-[.25px] text-white text-sm"></i>
            </div>
            <Link to={`/product/${itemId}`} className="w-[50px] flex-shrink-0">
                <img src={itemImage} className="w-full h-full object-contain" />
            </Link>
            <div className="max-w-[70%] flex flex-col justify-between">
                <Link to={`/product/${itemId}`}>
                    <p className="text-sm truncate">{itemTitle}</p>
                </Link>
                <p className="font-bold">{itemPrice}$</p>
                <div className="flex select-none">
                    <div className="border-1 border-gray-500 rounded-lg flex items-center justify-center text-center">
                        <button
                            name="quantity-decrement" 
                            onClick={decrement}
                            className={`w-8 text-green-500 mt-[2px] outline-none ${itemQuantity <= 1 ? "opacity-50" : "cursor-pointer opacity-100"}`}
                            disabled={itemQuantity <= 1}
                        >
                            <i className='bx bx-minus'></i>
                        </button>
                        <input
                            name="quantity-count"
                            className="max-w-[4ch] text-center"
                            type="number"
                            onChange={(e) => handleChange(e.target.value)}
                            value={quantity.toString()}
                            onBlur={handleBlur}
                        />
                        <button
                            name="quantity-increment" 
                            onClick={increment}
                            className="w-8 text-green-500 mt-[2px] ml-[2px] cursor-pointer outline-none"
                        >
                            <i className='bx bx-plus'></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
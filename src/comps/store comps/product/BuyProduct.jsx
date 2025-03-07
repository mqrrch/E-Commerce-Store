import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCartItemAsync } from "../../../features/cartAsyncThunks";

export default function BuyProduct({ data, isCartLoading, userId }){
    const [count, setCount] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const increment = () => {
        setCount(prev => prev + 1)
    }

    const decrement = () => {
        if (count > 1) {
            setCount(prev => prev - 1);
        }
    }

    const handleBlur = () => {
        if (count <= 0){
            setCount(1);
        }
    }

    const handleQuantityChange = (e) => {
        setCount(Number(e.target.value));
    }

    const handleBuy = () => {
        if (!userId) return navigate('/register');
    }

    const handleAddToCart = async () => {
        if (!userId) return navigate('/register');
        const itemData = {
            itemId: data.id,
            itemTitle: data.title,
            itemPrice: data.price,
            itemQuantity: count,
            itemImage: data.image,
        };
        dispatch(addCartItemAsync(itemData));
    }

    return(
        <div className="w-full flex flex-col mx-auto max-w-[400px] lg:max-w-[240px] xl:max-w-[300px] my-6 lg:my-8">
            {/* Buy or put into cart */}
            <div className="flex flex-col border-1 border-gray-400 rounded-xl p-3">
                <h3 className="font-semibold text-lg">Buy this product</h3>
                {/* Set quantity */}
                <div className="flex select-none mt-2">
                    <div className="border-1 border-gray-500 rounded-lg flex items-center justify-center text-center">
                        <button 
                            id="quantity-decrement" 
                            name="quantity-decrement" 
                            onClick={decrement}
                            className="w-8 text-green-500 mt-[2px] cursor-pointer outline-none"
                        >
                            <i className='bx bx-minus'></i>
                        </button>
                        <input 
                            id="quantity-count" 
                            name="quantity-count" 
                            className="max-w-[4ch] text-center" 
                            type="number"
                            onChange={handleQuantityChange} 
                            onBlur={handleBlur}
                            value={count.toString()} 
                        />
                        <button 
                            id="quantity-increment" 
                            name="quantity-increment" 
                            onClick={increment}
                            className="w-8 text-green-500 mt-[2px] ml-[2px] cursor-pointer outline-none"
                        >
                            <i className='bx bx-plus'></i>
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-gray-500 mt-1.5">Subtotal</p>
                    <p className="font-bold text-black text-xl">{`${(count * data.price).toFixed(2)}`}$</p>
                </div>

                {/* Choose either buying it right away or putting it into the cart */}
                <div className="flex justify-between items-center font-semibold gap-4 select-none mt-2">
                    <button
                        onClick={handleBuy}
                        className={`flex justify-center items-center w-full h-[40px] border-2 border-green-500 rounded-lg cursor-pointer ${isCartLoading ? 'opacity-60' : 'opacity-100'}`}
                        disabled={isCartLoading}
                    >
                        <p>Buy</p>
                    </button>
                    <button
                        onClick={handleAddToCart}
                        className={`flex justify-center items-center w-full h-[40px] bg-green-500 text-white rounded-lg cursor-pointer ${isCartLoading ? 'opacity-60' : 'opacity-100'}`}
                        disabled={isCartLoading}
                    >
                        <i className='bx bx-plus'></i>
                        <p className="mr-2">Cart</p>
                    </button>
                </div>
            </div>
        </div>
    )
}
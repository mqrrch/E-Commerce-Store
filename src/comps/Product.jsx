import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchSingleProduct from "../hooks/useFetchSingleProduct";
import { useSelector } from "react-redux";

export default function Product(){
    // Set count state for the quantity of products
    const [count, setCount] = useState(1);
    // Get the id from the URL and fetch the data of that product from the API
    const { id } = useParams();
    const data = useFetchSingleProduct(id);
    
    // If theres no data yet or its still loading, goes into the loading element
    const isLoading = useSelector(state => state.loading.loading)
    if (!data || isLoading) return <div></div>

    const increment = () => {
        setCount(prev => prev + 1)
    }

    const decrement = () => {
        if (count > 1) {
            setCount(prev => prev - 1);
        }
    }

    const handleChange = (e) => {
        // If theres a change from the input, it sets the value to number instead of string
        const value = Number(e.target.value);
        // Change the count if its more than 1, but if its less than count then set it to 1
        setCount(value < 1 ? 1 : value);
    }

    return (
        <div>
            {/* Image */}
            <div className="relative w-full h-[200px] overflow-hidden flex justify-center items-center select-none">
                <img src={data.image} className="max-w-full max-h-full object-contain"></img>
                <i className='bx bx-heart absolute bottom-0 right-0 text-2xl hover:text-red-500'></i>
            </div>

            {/* Description */}
            <div className="mt-4">
                <p className="text-xl">{data.title}</p>
                <p className="text-sm text-gray-700">Category : {data.category}</p>
                <div className="flex items-center gap-1">
                    <i className='bx bxs-star text-yellow-400'></i>
                    <p>{data.rating.rate}</p>
                    <p className="text-gray-500">({data.rating.count})</p>
                </div>
                <p className="text-3xl font-semibold mt-2">{data.price}$</p>
                <div className="mt-2">
                    <p className="text-lg">Description</p>
                    <p className="text-sm">{data.description}</p>
                </div>
            </div>

            {/* Buy or put into cart */}
            <div className="flex flex-col">
                {/* Set quantity */}
                <div className="flex select-none">
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
                            onChange={handleChange} 
                            value={count} 
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
                <p>Subtotal : {`${(count * data.price).toFixed(2)}`}$</p>

                {/* Choose either buying it right away or putting it into the cart */}
                <div className="flex items-center font-semibold gap-4 select-none">
                    <div className="flex justify-center items-center w-[90px] h-[40px] border-2 border-green-500 rounded-lg cursor-pointer">
                        <p>Buy</p>
                    </div>
                    <div className="flex justify-center items-center w-[90px] h-[40px] bg-green-500 text-white rounded-lg cursor-pointer">
                        <i className='bx bx-plus'></i>
                        <p className="mr-2">Cart</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchData from "../../../hooks/useFetchData";
import { useDispatch, useSelector } from "react-redux";
import { addCartItemAsync } from "../../../features/cartAsyncThunks";
import { addWishlistItemAsync, removeWishlistItemAsync } from "../../../features/wishlistAsyncThunks";
import MoreProduct from "./MoreProduct";
import ProductDescription from "./ProductDescription";

export default function Product(){
    // Set count state for the quantity of products
    const [count, setCount] = useState(1);
    // Get the id from the URL and fetch the data of that product from the API
    const { id } = useParams();
    const data = useFetchData(`products/${id}`);
    // Get product category and search for more products with the same category
    const productCategory = data?.category;
    const products = useFetchData('products/');
    const categorizedProducts = products.filter((product) => {
        if (product.category === productCategory?.toLowerCase()){
            if(product.id !== Number(id)){
                return product;
            }
        }
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const userId = useSelector(state => state.user.uid);
    
    // Map the wishlist items, itemId as the key and the item data as the value/data
    const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
    const wishlistMap = new Map(
        wishlistItems.map(item => [String(item.itemId), item])
    )
    
    // Check whether the wishlistMap has a key that is the same as the current product itemId
    const isWishlisted = wishlistMap.has(String(id));
    // Get the firestore doc id from the key that is the same as the current product itemId
    const wishlistedItemId = wishlistMap.get(String(id))?.id;
    
    const isCartLoading = useSelector(state => state.cart.status) === 'loading';

    // If theres no data yet or its still loading, goes into the loading element
    const isLoading = useSelector(state => state.loading.loadingCounter > 0);
    if (data.length <= 0 || isLoading) return <div></div>

    const increment = () => {
        setCount(prev => prev + 1)
    }

    const decrement = () => {
        if (count > 1) {
            setCount(prev => prev - 1);
        }
    }

    const handleQuantityChange = (e) => {
        // If theres a change from the input, it sets the value to number instead of string
        const value = Number(e.target.value);
        // Change the count if its more than 1, but if its less than count then set it to 1
        setCount(value < 1 ? 1 : value);
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
    
    const handleAddToWishlist = async () => {
        if (!userId) return navigate('/register');
        const itemData = {
            itemId: data.id,
            itemTitle: data.title,
            itemPrice: data.price,
            itemImage: data.image,
        };
        dispatch(addWishlistItemAsync(itemData));
    }

    const handleRemoveWishlist = async () => {
        dispatch(removeWishlistItemAsync({ id: wishlistedItemId }));
    }

    return (
        <div className="flex flex-col gap-8 md:px-10">
            {/* Background div */}
            <div className="fixed top-0 left-0 w-full h-screen bg-white z-[-1]"></div>

            <div className="flex flex-col gap-4 w-full lg:gap-16 lg:flex-row">
                {/* Image */}
                <div className="relative w-full h-[200px] overflow-hidden flex justify-center items-center select-none">
                    <img src={data.image} className="max-w-full max-h-full object-contain"></img>
                    <i 
                        onClick={isWishlisted ? handleRemoveWishlist : handleAddToWishlist}
                        className={`bx ${isWishlisted ? 'bxs-heart text-red-500 hover:text-red-400' : 'bx-heart hover:text-red-500'} absolute bottom-0 right-0 text-2xl`}
                    ></i>
                </div>

                {/* Description */}
                <div className="">
                    <p className="text-xl">{data.title}</p>
                    {/* <p className="text-sm text-gray-700">Category : {data.category}</p> */}
                    <div className="flex items-center gap-1">
                        <i className='bx bxs-star text-yellow-400'></i>
                        <p>{data.rating.rate}</p>
                        <p className="text-gray-500">({data.rating.count})</p>
                    </div>
                    <p className="text-3xl font-semibold mt-2">{data.price}$</p>
                    <div className="mt-2">
                        <p className="text-lg">Description</p>
                        <ProductDescription description={data.description} />
                    </div>
                </div>
            </div>



            <div className="w-full flex flex-col mx-auto max-w-[400px]">
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


            {/* Make the more like this product recommendation */}
            <div className="">
                <MoreProduct products={categorizedProducts} />
            </div>
        </div>
    )
}
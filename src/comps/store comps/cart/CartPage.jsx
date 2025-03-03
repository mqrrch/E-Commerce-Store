import { useSelector } from "react-redux"
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

export default function CartPage(){
    const cartItems = useSelector(state => state.cart.cartItems);

    const totalPrice = cartItems.reduce((sum, item) => sum + item.itemPrice * item.itemQuantity, 0).toFixed(2)

    return(
        <div className="pb-24">
            <h2 className="text-xl font-bold">My cart</h2>
            <div className="grid grid-cols-1 w-full gap-3 mt-4">
                {cartItems.length <= 0 && 
                    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col justify-center items-center gap-4">
                        <div className="max-w-[120px] select-none">
                            <img
                                className="w-full h-auto" 
                                src="https://images.tokopedia.net/img/purchase-platform/illustration/empty-state-pp.png" 
                            />
                        </div>
                        <p>Oops, theres nothing in this cart!</p>
                        <Link to='/' className="mb-2">
                            <button className="p-2 px-4 border-2 border-green-500 rounded-2xl text-green-700 font-semibold select-none cursor-pointer hover:bg-green-200 transition-colors duration-300">
                                Start Shopping
                            </button>
                        </Link>
                    </div>
                }
                {cartItems.map((item, index) => 
                    <CartItem key={index} {...item} />
                )}
            </div>
            {cartItems.length >= 1 && 
                <div className="flex flex-col gap-2 fixed bottom-0 left-0 p-4 w-full bg-white">
                    <p className="text-gray-600">Total: <span className="font-semibold">{totalPrice}$</span></p>
                    <button className="p-2 bg-green-400 text-white rounded-lg w-full cursor-pointer hover:bg-green-500 transition-colors duration-300">
                        Checkout
                    </button>
                </div>
            }
        </div>
    )
}
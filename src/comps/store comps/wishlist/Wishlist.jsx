import { useSelector } from "react-redux";
import WishlistItem from "./WishlistItem";
import { Link } from "react-router-dom";

export default function Wishlist(){
    const wishlistItems = useSelector(state => state.wishlist.wishlistItems);

    return(
        <>
            <h2
                id="wishlist-title"
                className="text-xl font-bold"
            >
                My wishlist
            </h2>
            <div
                id="wishlist-items"
                className="grid gap-3 w-full"
            >
                {wishlistItems.length <= 0 &&
                    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col justify-center items-center gap-4">
                        <div className="max-w-[120px] select-none">
                            <img
                                className="w-full h-auto" 
                                src="https://images.tokopedia.net/img/purchase-platform/illustration/empty-state-pp.png" 
                            />
                        </div>
                        <p className="wishlist-item-text">You dont wishlist anything yet!</p>
                        <Link to='/' className="mb-2">
                            <button className="wishlist-item-text p-2 px-4 border-2 border-green-500 rounded-2xl text-green-700 font-semibold select-none cursor-pointer hover:bg-green-200 transition-colors duration-300">
                                Start Shopping
                            </button>
                        </Link>
                    </div>
                }
                {wishlistItems.map(item =>
                    <WishlistItem key={item.itemId} {...item} />
                )}
            </div>
        </>
    )
}
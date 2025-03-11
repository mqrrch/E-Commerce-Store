import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeWishlistItemAsync } from "../../../features/wishlistAsyncThunks";

export default function WishlistItem({ id, itemId, itemTitle, itemPrice, itemImage }){
    const dispatch = useDispatch();

    return(
        <div className="flex relative gap-4 w-full h-[100px] bg-white p-2 rounded-xl shadow-lg">
            <div
                onClick={() => dispatch(removeWishlistItemAsync({ id: id }))}
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 flex justify-center items-center text-center rounded-full cursor-pointer select-none"
            >
                <i className="bx bx-x ml-[.25px] text-white text-sm"></i>
            </div>
            <Link to={`/product/${itemId}`} className="w-[50px] flex-shrink-0">
                <img src={itemImage} className="w-full h-full object-contain" />
            </Link>
            <div className="max-w-[70%] flex flex-col justify-center">
                <Link to={`/product/${itemId}`}>
                    <p className="wishlist-item-text truncate">{itemTitle}</p>
                </Link>
                <p className="wishlist-item-text font-bold">{itemPrice}$</p>
            </div>
        </div>
    )
}
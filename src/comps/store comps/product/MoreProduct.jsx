import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addWishlistItemAsync, removeWishlistItemAsync } from "../../../features/wishlistAsyncThunks";

export default function MoreProduct({ products }){
    const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
    const wishlistMap = useMemo(() => new Map(
        wishlistItems.map(item => [String(item.itemId), item])
    ), [wishlistItems]);

    const userId = useSelector(state => state.user.uid);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div>
            <h3 className="font-bold text-xl">More like this product</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 mt-6">
                {products.map(product => 
                    <div
                        key={product.id}
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="flex flex-col shadow-lg rounded-2xl p-4 gap-4 cursor-pointer bg-white"
                    >
                        <div className="w-full h-[130px] overflow-hidden flex justify-center items-center select-none">
                            <img src={product.image} className="max-w-full max-h-full object-contain"></img>
                        </div>
                        <div className="">
                            <div className="flex gap-2 justify-between">
                                <p className="leading-[20px] overflow-ellipsis whitespace-pre-wrap line-clamp-2">
                                    {product.title}
                                </p>
                                <i
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (!userId) return navigate('/register');
                                        wishlistMap.has(String(product.id)) ?
                                        dispatch(removeWishlistItemAsync({ id: wishlistMap.get(String(product.id)).id })) :
                                        dispatch(addWishlistItemAsync({
                                            itemId: product.id,
                                            itemTitle: product.title,
                                            itemPrice: product.price,
                                            itemImage: product.image,
                                        }))
                                    }}
                                    className={`bx ${wishlistMap.has(String(product.id)) ? 'bxs-heart text-red-500 hover:text-red-400' : 'bx-heart hover:text-red-500'} text-2xl select-none`}
                                ></i>
                            </div>
                            <p className="text-lg font-semibold">{product.price}$</p>
                            <div className="flex items-center gap-1 text-sm">
                                <i className='bx bxs-star text-yellow-400'></i>
                                <p>{product.rating.rate}</p>
                                <p className="text-gray-500">({product.rating.count})</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
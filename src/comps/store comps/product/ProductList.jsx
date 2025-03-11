import { Link } from "react-router-dom";
import useFetchData from "../../../hooks/useFetchData";
import Category from "../Category";
import Sort from "../Sort";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFilterProducts from "../../../hooks/useFilterProducts";
import { clearSearch } from "../../../features/searchSlice";
import { useMemo } from "react";
import { addWishlistItemAsync, removeWishlistItemAsync } from "../../../features/wishlistAsyncThunks";

export default function ProductList(){
    // Get products from the API then filter it
    const products = useFetchData('products');
    const filteredProducts = useFilterProducts(products);

    // Get values from redux state
    const searchName = useSelector(state => state.search.searchName);
    const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
    const userId = useSelector(state => state.user.uid)

    // useMemo to only make a change when the wishlistItems are changed
    const wishlistMap = useMemo(() => new Map(
        wishlistItems.map(item => [String(item.itemId), item])
    ), [wishlistItems]);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return(
        <div className="">
            <div className="flex flex-col gap-4 md:flex-row">
                <Category />
                <Sort />
            </div>
            <div className="mt-6">
                {searchName.trim() && 
                    <div 
                        onClick={() => dispatch(clearSearch())} 
                        className="relative p-1 px-2 text-[12px] w-max bg-gray-500 text-white rounded-2xl mb-1 select-none cursor-pointer"
                    >
                        <div className="absolute flex justify-center items-center -top-0.5 -right-0.5 w-3 h-3 bg-gray-400 rounded-full">
                            <i className="bx bx-x"></i>
                        </div>
                        <p className="">Search: {searchName}</p>
                    </div>
                }
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
                    {filteredProducts.map((product) => (
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
                                    <p className="product-list-title leading-[20px] overflow-ellipsis whitespace-pre-wrap line-clamp-2">
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
                                        className={`product-list-wishlist bx ${wishlistMap.has(String(product.id)) ? 'bxs-heart text-2xl text-red-500 hover:text-red-400' : 'bx-heart hover:text-red-500'} select-none`}
                                    ></i>
                                </div>
                                <p className="product-list-price font-semibold text-lg">{product.price}$</p>
                                <div className="product-list-rating text-sm flex items-center gap-1">
                                    <i className='bx bxs-star text-yellow-400'></i>
                                    <p>{product.rating.rate}</p>
                                    <p className="text-gray-500">({product.rating.count})</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
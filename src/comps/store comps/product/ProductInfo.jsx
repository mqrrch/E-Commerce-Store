import { useDispatch } from "react-redux";
import ProductDescription from "./ProductDescription"
import { addWishlistItemAsync, removeWishlistItemAsync } from "../../../features/wishlistAsyncThunks";
import { useNavigate } from "react-router-dom";

export default function ProductInfo({ id, data, wishlistMap, userId }){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Check whether the wishlistMap has a key that is the same as the current product itemId
    const isWishlisted = wishlistMap.has(String(id));
    // Get the firestore doc id from the key that is the same as the current product itemId
    const wishlistedItemId = wishlistMap.get(String(id))?.id;
    
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

    return(
        <div className="flex flex-col gap-2 w-full lg:max-w-[600px] md:gap-8 lg:flex-row">
            {/* Image */}
            <div className="relative w-full h-[200px] md:h-[240px] max-w-[260px] overflow-hidden flex justify-center items-center mx-auto select-none">
                <img src={data.image} className="max-w-full max-h-full object-contain"></img>
                <i 
                    onClick={isWishlisted ? handleRemoveWishlist : handleAddToWishlist}
                    className={`bx ${isWishlisted ? 'bxs-heart text-red-500 hover:text-red-400' : 'bx-heart hover:text-red-500'} absolute bottom-0 right-0 text-2xl`}
                ></i>
            </div>

            {/* Description */}
            <div className="lg:max-w-[350px] xl:max-w-[400px]">
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
    )
}
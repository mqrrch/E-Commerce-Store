import { useParams } from "react-router-dom";
import useFetchData from "../../../hooks/useFetchData";
import { useSelector } from "react-redux";
import MoreProduct from "./MoreProduct";
import ProductInfo from "./ProductInfo";
import BuyProduct from "./BuyProduct";

export default function Product(){
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

    // Map the wishlist items, itemId as the key and the item data as the value/data
    const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
    const wishlistMap = new Map(
        wishlistItems.map(item => [String(item.itemId), item])
    )

    const isCartLoading = useSelector(state => state.cart.status) === 'loading';
    
    const userId = useSelector(state => state.user.uid);

    // If theres no data yet or its still loading, goes into the loading element
    const isLoading = useSelector(state => state.loading.loadingCounter > 0);
    if (data.length <= 0 || isLoading) return <div></div>

    return (
        <div className="flex flex-col gap-8 md:px-10 lg:pt-6 max-w-[1000px] mx-auto">
            {/* Background div */}
            <div className="fixed top-0 left-0 w-full h-screen bg-white z-[-1]"></div>

            <div className="flex flex-col gap-4 lg:flex-row">
                <ProductInfo 
                    id={id}
                    data={data}
                    wishlistMap={wishlistMap}
                    userId={userId}
                />

                <BuyProduct
                    data={data}
                    isCartLoading={isCartLoading}
                    userId={userId}
                />
            </div>

            {/* Make the more like this product recommendation */}
            <div className="">
                <MoreProduct products={categorizedProducts} />
            </div>
        </div>
    )
}
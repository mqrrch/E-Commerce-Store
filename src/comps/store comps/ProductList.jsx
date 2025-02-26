import { Link } from "react-router-dom"
import useFetchProducts from '../../hooks/useFetchProducts'
import Category from "./Category"
import Sort from "./Sort"
import { useDispatch, useSelector } from "react-redux"
import { useMemo } from "react"
import { clearSearch } from "../../features/searchSlice"

export default function ProductList(){
    // Get products from the API
    const products = useFetchProducts();

    // Get category, sort, and search value from redux state
    const category = useSelector((state) => state.category.category);
    const sort = useSelector((state) => state.sort.sort);
    const searchName = useSelector((state) => state.search.searchName);
    
    const dispatch = useDispatch();

    // Sort the products from the category only when products or the category got changed
    const categorizedProducts = useMemo(() => {
        // If category is the initial state or all then it returns the same products into the categorized products
        if (category === 'Select a Category' || category === 'All') return products;
        // Else returns the products that is filtered by the product category into the categorized products
        return products.filter((product) => product.category === category.toLowerCase());
    }, [products, category])
    
    // Sort the products from the sort
    const sortedProducts = useMemo(() => {
        // Make a new array to avoid changing the categorized products
        const sorted = [...categorizedProducts];
        // Make cases for each sort
        switch (sort) {
            case "Highest to lowest price":
                sorted.sort((a, b) => b.price - a.price);
                break;
            case "Lowest to highest price":
                sorted.sort((a, b) => a.price - b.price);
                break;
            case "Highest to lowest rating":
                sorted.sort((a, b) => b.rating.rate - a.rating.rate);
                break;
            case "Lowest to highest rating":
                sorted.sort((a, b) => a.rating.rate - b.rating.rate);
                break;
            case "Alphabetical":
                sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                break;
        }
        // Return sorted as sortedProducts
        return sorted;
    }, [categorizedProducts, sort])

    // Filter the product by the search value
    const filteredProducts = useMemo(() => {
        // If theres nothing on the name, return
        if (!searchName.trim()) return sortedProducts;
        // Else filter the product if it includes the search value
        return sortedProducts.filter((product) => product.title.toLowerCase().includes(searchName.toLowerCase()))
    }, [sortedProducts, searchName])

    return(
        <div className="">
            <div className="flex flex-col gap-4">
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
                <div className="grid grid-1 gap-10">
                    {filteredProducts.map((product) => (
                        <Link 
                            key={product.id} 
                            to={`/product/${product.id}`}
                        >
                            <div className="flex flex-col shadow-lg rounded-2xl p-4 gap-4 cursor-pointer bg-white">
                                <div className="w-full h-[130px] overflow-hidden flex justify-center items-center select-none">
                                    <img src={product.image} className="max-w-full max-h-full object-contain"></img>
                                </div>
                                <div className="">
                                    <div className="flex gap-2 justify-between">
                                        <p className="leading-[20px] overflow-ellipsis whitespace-pre-wrap line-clamp-2">
                                            {product.title}
                                        </p>
                                        <i className='bx bx-heart text-2xl hover:text-red-500'></i>
                                    </div>
                                    <p className="text-lg font-semibold">{product.price}$</p>
                                    <div className="flex items-center gap-1 text-sm">
                                        <i className='bx bxs-star text-yellow-400'></i>
                                        <p>{product.rating.rate}</p>
                                        <p className="text-gray-500">({product.rating.count})</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
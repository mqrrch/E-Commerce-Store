import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function useFilterProducts(products){
    // Get category, sort, and search value from redux state
    const category = useSelector((state) => state.category.category);
    const sort = useSelector((state) => state.sort.sort);
    const searchName = useSelector((state) => state.search.searchName);

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

    return filteredProducts;
}
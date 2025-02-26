import { useState, useEffect, useRef } from "react"
import useFetchCategories from "../../hooks/useFetchCategories";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../features/categorySlice";

export default function Category(){
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const selectedCategory = useSelector(state => state.category.category)
    const dispatch = useDispatch();

    // Example list of categories (you can replace these with your own)
    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
    const fetchCategories = useFetchCategories();
    const categories = ['All', ...fetchCategories].map(category => capitalizeFirstLetter(category));

    // Ref for the dropdown to detect outside clicks
    const dropdownRef = useRef(null);

    // Handle selection of a category
    const handleCategoryClick = (category) => {
        dispatch(setCategory(category));
        setIsCategoryOpen(false);
    };

    // Close dropdown if clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsCategoryOpen(false);
            }
        };

        if (isCategoryOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup event listener on unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCategoryOpen]);

    return (
        <div>
            <div className="relative rounded-full mx-auto select-none bg-white" ref={dropdownRef}>
                <button
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="w-full rounded-full py-2 px-4 select-none border-1 border-gray-500 focus:outline-none cursor-pointer"
                    aria-haspopup="listbox"
                    aria-expanded={isCategoryOpen}
                >
                    {selectedCategory}
                </button>

                {/* Dropdown menu */}
                {isCategoryOpen && (
                    <div className="absolute mt-1 w-full bg-white shadow-lg rounded-md z-[3]">
                        <ul className="max-h-60 overflow-auto" role="listbox">
                            {categories.map((category, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleCategoryClick(category)}
                                    className="cursor-pointer hover:bg-gray-200 px-4 py-2"
                                    role="option"
                                    aria-selected={selectedCategory === category}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}
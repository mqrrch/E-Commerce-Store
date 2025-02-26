import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../features/sortSlice";

export default function Sort(){
    const [isSortOpen, setIsSortOpen] = useState(false);
    const selectedSort = useSelector(state => state.sort.sort)
    const dispatch = useDispatch()

    // Example list of categories (you can replace these with your own)
    const sorts = ['None', 'Highest to lowest price', 'Lowest to highest price', 'Highest to lowest rating', 'Lowest to highest rating', 'Alphabetical'];

    // Ref for the dropdown to detect outside clicks
    const dropdownRef = useRef(null);

    // Handle selection of a sort
    const handleSortClick = (sort) => {
        dispatch(setSort(sort));
        setIsSortOpen(false);
    };

    // Close dropdown if clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsSortOpen(false);
            }
        };

        if (isSortOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup event listener on unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSortOpen]);

    return (
        <div>
            <div className="relative rounded-full mx-auto select-none bg-white" ref={dropdownRef}>
                <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="w-full rounded-full py-2 px-4 select-none focus:outline-none border-1 border-gray-500 cursor-pointer"
                    aria-haspopup="listbox"
                    aria-expanded={isSortOpen}
                >
                    {selectedSort}
                </button>

                {/* Dropdown menu */}
                {isSortOpen && (
                    <div className="absolute mt-1 w-full bg-white shadow-lg rounded-md z-[3]">
                        <ul className="max-h-60 overflow-auto" role="listbox">
                            {sorts.map((sort, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSortClick(sort)}
                                    className="cursor-pointer hover:bg-gray-200 px-4 py-2"
                                    role="option"
                                    aria-selected={selectedSort === sort}
                                >
                                    {sort}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}
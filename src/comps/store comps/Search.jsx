import { useState } from "react"
import { setSearch } from "../../features/searchSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Search(){
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchName, setSearchName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearch(searchName));
        navigate('/');
    }

    return(
        <>
            <a className="text-2xl cursor-pointer" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <i className='bx bx-search-alt-2'></i>
            </a>
            {isSearchOpen && (
                <form 
                    onSubmit={handleSubmit}
                    className="fixed top-15 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[600px] text flex items-center pl-2 bg-white border-1 border-gray-500 rounded-2xl" 
                    autoComplete="off"
                >
                    <label className='bx bx-search-alt-2 text-gray-500' htmlFor="search-input"></label>
                    <input 
                        className="ml-1 flex-1 mr-4 outline-none py-1" 
                        value={searchName} 
                        onChange={(e) => setSearchName(e.target.value)}
                        placeholder="Search" id="search-input" name="search-input" 
                    />
                </form>
            )}
        </>
    )
}
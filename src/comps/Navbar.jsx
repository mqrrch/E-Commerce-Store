import { useState } from "react"
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";
import Cart from "./Cart";

export default function Navbar(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return(
        <nav className="fixed flex justify-between top-0 w-full select-none bg-white z-50">
            <div className="flex">
                <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <Link to='/' className="italic text-xl text-center text-green-500 self-center font-bold">
                    <h2>Shop name</h2>
                </Link>
            </div>
            <div className="flex items-center gap-5 mr-4">
                <Search />
                <Cart />
            </div>
        </nav>
    )
}
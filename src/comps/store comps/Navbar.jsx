import { useState } from "react"
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";
import CartHandler from "./cart/CartHandler";

export default function Navbar(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return(
        <nav className="fixed flex justify-between md:justify-start md:gap-8 top-0 w-full select-none bg-white z-50 shadow-lg">
            <div className="flex">
                <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <Link to='/' className="text-xl text-center text-green-500 self-center font-bold">
                    <h2>Shop2Go</h2>
                </Link>
            </div>
            <div className="flex md:flex-1 items-center gap-3 mr-4">
                <Search />
                <CartHandler />
            </div>
        </nav>
    )
}
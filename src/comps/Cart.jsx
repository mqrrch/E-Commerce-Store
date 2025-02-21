import { useState } from "react"
import { Link } from "react-router-dom"

export default function Cart(){
    const [isCartOpen, setIsCartOpen] = useState(false)
    
    return(
        <>
            <a className="text-2xl cursor-pointer" onClick={() => setIsCartOpen(true)}>
                <i className='bx bx-cart'></i>
            </a>
            <div 
                id="menu-overlay" 
                onClick={() => setIsCartOpen(false)} 
                className={`fixed top-0 left-0 h-screen w-full bg-black transition-opacity duration-500 z-[3] ${isCartOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
            ></div>
            <div className={`fixed flex flex-col justify-center items-center gap-4 bottom-0 left-0 w-full transition-all duration-500 bg-white z-[5] h-[80%] p-8 ${isCartOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="max-w-[120px]">
                    <img
                        className="w-full h-auto" 
                        src="https://images.tokopedia.net/img/purchase-platform/illustration/empty-state-pp.png" 
                    />
                </div>
                <p>Oops, theres nothing in this cart!</p>
                <Link to='/'>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 px-4 border-2 border-green-500 rounded-2xl text-green-700 font-semibold cursor-pointer hover:bg-green-200 transition-colors duration-300"
                    >
                        Start Shopping
                    </button>
                </Link>
            </div>
        </>
    )
}
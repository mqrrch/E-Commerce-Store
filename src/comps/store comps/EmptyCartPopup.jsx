import { Link } from "react-router-dom"

export default function EmptyCartPopup(){
    return(
        <>
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
        </>
    )
}
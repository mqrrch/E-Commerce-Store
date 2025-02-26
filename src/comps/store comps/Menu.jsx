import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../../features/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function Menu({ isMenuOpen, setIsMenuOpen }){
    const user = useSelector(state => state.user)
    console.log(user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async() => {
        try {
            setIsMenuOpen(false);
            await signOut(auth);
            navigate('/register')
        } catch(err){
            console.log(err);
        }
    }

    return (
        <>
            <button 
                className={`menu-btn p-5 cursor-pointer z-[2] outline-none ${isMenuOpen ? "open" : ""}`} 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                    <div className="menu-btn-line"></div>
                    <div className="menu-btn-line"></div>
                    <div className="menu-btn-line"></div>
            </button>
            <div 
                id="menu-overlay" 
                onClick={() => setIsMenuOpen(false)} 
                className={`fixed top-0 left-0 h-screen w-full bg-black transition-opacity duration-500 z-[1] ${isMenuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
            ></div>
            <div 
                id="menu" 
                onClick={e => e.stopPropagation()}
                className={`fixed top-0 left-0 h-full flex flex-col z-[1] bg-white w-[80%] ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <ul id="menu-content" className={`flex flex-col items-start gap-3 ml-5 mt-16`}>
                    <li>About</li>
                    <li>Contacts</li>
                    <Link to='/wishlist'>
                        <li>Wishlist</li>
                    </Link>
                    {user.uid ? (
                        <button className='cursor-pointer' onClick={handleLogout}>
                            <li>Logout</li>
                        </button>
                    ) : (
                        <Link to='/register' onClick={() => setIsMenuOpen(false)}>
                            <li>Sign up</li>
                        </Link>
                    )}
                </ul>
            </div>
        </>
    )
}
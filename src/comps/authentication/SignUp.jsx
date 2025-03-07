import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../features/userSlice";
import { useDispatch } from "react-redux";

export default function SignUp(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isHidePassword, setIsHidePassword] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const serializableUser = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL,
            }
            dispatch(setUser(serializableUser))
            navigate('/')
        } catch (err){
            setError(err.message);
        }
    }

    return(
        <>
            <form
                className="flex flex-col"
                onSubmit={handleSubmit}
            >
                <h3 className="text-center text-xl font-semibold">Sign up with:</h3>
                <p className="text-sm text-center mt-1">
                    Already have an account? Click <Link to='/login' className="text-green-500 transition-colors duration-100 hover:text-green-600">here</Link>
                </p>
                <div className="relative mt-4 select-none">
                    <input
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        className="border-1 border-gray-400 py-[10px] px-2 pl-4 rounded-xl peer focus:border-green-600 outline-none placeholder-transparent w-full text-sm"
                        type="email"
                        name="register-email"
                        id="register-email"
                        placeholder=" "
                        required
                    />
                    <label
                        className="absolute -top-[7px] left-6 text-xs bg-white text-gray-500 px-1 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-[9px] peer-placeholder-shown:left-2.5 peer-focus:text-xs peer-focus:-top-[7px] peer-focus:left-6"
                        htmlFor="register-email"
                    >
                        Email
                    </label>
                </div>
                <div className="relative mt-2 select-none">
                    <input
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        className="border-1 border-gray-400 py-[10px] px-2 pl-4 pr-10 rounded-xl peer focus:border-green-600 outline-none placeholder-transparent w-full text-sm"
                        type={isHidePassword ? "password" : ""}
                        name="register-password"
                        id="register-password"
                        placeholder=" "
                        required
                    />
                    <label
                        className="absolute -top-[7px] left-6 text-xs bg-white text-gray-500 px-1 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-[9px] peer-placeholder-shown:left-2.5 peer-focus:text-xs peer-focus:-top-[7px] peer-focus:left-6"
                        htmlFor="register-password"
                    >
                        Password
                    </label>
                    <i className={`fa-solid ${isHidePassword ? 'fa-eye' : 'fa-eye-slash'} absolute right-3 top-3.5 text-gray-500 cursor-pointer select-none`} onClick={() => setIsHidePassword(!isHidePassword)}></i>
                    <p className="text-xs ml-2 mt-0.5 text-red-500">{error}</p>
                </div>
                <button type="submit" className="p-2 text-center border-1 border-green-400 hover:bg-green-200 cursor-pointer rounded-xl mt-4 transition-colors duration-300">
                    <p className="text-green-600 font-bold">Sign In</p>
                </button>
            </form>
        </>
    )
}
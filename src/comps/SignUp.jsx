import { Link } from "react-router-dom";
import { auth } from "../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup, 
    GoogleAuthProvider,
} from "firebase/auth";

export default function SignUp(){


    return(
        <>
            <div className="fixed top-0 left-0 w-full flex justify-center items-center p-2 bg-white">
                <Link to="/">
                    <h2 className="text-2xl text-green-500 font-semibold">Shop Name</h2>
                </Link>
            </div>
            <form className="flex flex-col mt-12 p-4">
                <h3 className="text-center text-xl font-semibold">Sign up with:</h3>
                <p className="text-sm text-center mt-1">
                    Already have an account? Click <Link to='/log-in' className="text-green-500 transition-colors duration-100 hover:text-green-600">here</Link>
                </p>
                <div className="relative mt-4">
                    <input
                        className="border-1 border-gray-400 py-[10px] px-2 pl-4 rounded-xl peer focus:border-green-600 outline-none placeholder-transparent w-full text-sm"
                        type="email"
                        name="register-email"
                        id="register-email"
                        placeholder=" "
                    />
                    <label
                        className="absolute -top-[7px] left-6 text-xs bg-white text-gray-500 px-1 transition-all duration-300 z-0 peer-placeholder-shown:text-base peer-placeholder-shown:top-[9px] peer-placeholder-shown:left-2.5 peer-placeholder-shown:z-[-2] peer-focus:text-xs peer-focus:-top-[7px] peer-focus:left-6 peer-focus:z-0"
                        htmlFor="register-email"
                    >
                        Email
                    </label>
                </div>
                <div className="relative mt-2">
                    <input
                        className="border-1 border-gray-400 py-[10px] px-2 pl-4 rounded-xl peer focus:border-green-600 outline-none placeholder-transparent w-full text-sm"
                        type="email"
                        name="register-password"
                        id="register-password"
                        placeholder=" "
                    />
                    <label
                        className="absolute -top-[7px] left-6 text-xs bg-white text-gray-500 px-1 transition-all duration-300 z-0 peer-placeholder-shown:text-base peer-placeholder-shown:top-[9px] peer-placeholder-shown:left-2.5 peer-placeholder-shown:z-[-2] peer-focus:text-xs peer-focus:-top-[7px] peer-focus:left-6 peer-focus:z-0"
                        htmlFor="register-password"
                    >
                        Password
                    </label>
                </div>
                <button type="submit" className="p-2 text-center border-1 border-green-400 hover:bg-green-200 cursor-pointer rounded-xl mt-4 transition-colors duration-300">
                    <p className="text-green-600 font-bold">Sign In</p>
                </button>
                <div className="flex items-center justify-center gap-3 mt-4 select-none">
                    <div className="h-[.8px] bg-gray-300 flex-1"></div>
                    <p className="text-gray-500">or with</p>
                    <div className="h-[.8px] bg-gray-300 flex-1"></div>
                </div>
                <button 
                    type="button" 
                    className="flex items-center justify-center border-1 border-gray-400 p-2 rounded-xl gap-1 mt-4 cursor-pointer hover:bg-gray-200 transition-colors duration-300"
                >
                    <div className="">
                        <img src="https://assets.tokopedia.net/asts/oauth/static-asset-icon/google.svg" className="w-full h-auto"></img>
                    </div>
                    <p className="text-gray-500 font-bold">Google</p>
                </button>
            </form>
        </>
    )
}
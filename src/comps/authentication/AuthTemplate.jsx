import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { auth } from "../../firebase";
import {
    signInWithPopup, 
    GoogleAuthProvider,
} from "firebase/auth";
import { setUser } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import Login from "./Login";
import SignUp from "./SignUp";

export default function AuthTemplate(){
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authType } = useParams();

    const handleGoogle = async () => {
        try {
            const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
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
            setError(err.message)
        }
    }

    return(
        <div className="flex flex-col p-4">
            <div className="fixed top-0 left-0 w-full flex justify-center items-center p-2 bg-white">
                <Link to="/">
                    <h2 className="text-2xl text-green-500 font-semibold">Shop2Go</h2>
                </Link>
            </div>
            {authType === 'register' && <SignUp />}
            {authType === 'login' && <Login />}
            <div className="flex flex-col">
                <div className="flex items-center justify-center gap-3 mt-4 select-none">
                    <div className="h-[.8px] bg-gray-300 flex-1"></div>
                    <p className="text-gray-500">or with</p>
                    <div className="h-[.8px] bg-gray-300 flex-1"></div>
                </div>
                <button 
                    type="button"
                    onClick={handleGoogle}
                    className="flex items-center justify-center border-1 border-gray-400 p-2 rounded-xl gap-1 mt-4 cursor-pointer hover:bg-gray-200 transition-colors duration-300"
                >
                    <div className="">
                        <img src="https://assets.tokopedia.net/asts/oauth/static-asset-icon/google.svg" className="w-full h-auto"></img>
                    </div>
                    <p className="text-gray-500 font-bold">Google</p>
                </button>
            </div>
        </div>
    )
}
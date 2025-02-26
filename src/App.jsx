import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './comps/store comps/Navbar'
import ProductList from './comps/store comps/ProductList'
import Product from './comps/store comps/Product'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import './App.css'
import MainLayout from './comps/store comps/MainLayout'
import { clearUser, setUser } from './features/userSlice'
import AuthTemplate from './comps/authentication/AuthTemplate'
import CartPage from './comps/store comps/CartPage'
import Wishlist from './comps/store comps/Wishlist'

function App() {
  const isLoading = useSelector(state => state.loading.loading)
  const dispatch = useDispatch()

  // Listen for changes in user auth
  useEffect(() => {
    // Register auth state listener
    const unsubscribe = onAuthStateChanged(auth, user => {
      // Update state with user or null if logged out
      if (user) {
        const serializableUser = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
        }
        dispatch(setUser(serializableUser))
      } else{
        dispatch(clearUser())
      }
    });
    // Cleanup (remove the listener when component unmounts)
    return unsubscribe;
  }, []);

  return (
    <BrowserRouter basename='/E-Commerce-Store/'>
      <div>
        <div className='fixed top-0 left-0 w-full h-screen z-[-2] bg-slate-200'>

        </div>
        {isLoading && (
          <div className='fixed top-0 left-0 w-full h-screen z-20 bg-white flex justify-center items-center'>
            <p>Loading . . .</p>
          </div>
        )}
        <Routes>
          {/* Routes with no navbar */}
          <Route path='/:authType' element={<AuthTemplate />}></Route>

          {/* Main layout routes (routes with navbar) */}
          <Route path='/' element={<MainLayout />}>
            <Route index element={<ProductList />}></Route>
            <Route path='/product/:id' element={<Product />}></Route>
            <Route path='/cart' element={<CartPage />}></Route>
            <Route path='/wishlist' element={<Wishlist />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
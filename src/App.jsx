import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './comps/Navbar'
import ProductList from './comps/ProductList'
import Product from './comps/Product'
import { useSelector } from 'react-redux'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import './App.css'
import SignUp from './comps/SignUp'
import MainLayout from './comps/MainLayout'

function App() {
  const isLoading = useSelector(state => state.loading.loading)

  // Set user states
  const [user, setUser] = useState(null);

  // Listen for changes in user auth
  useEffect(() => {
    // Register auth state listener
    const unsubscribe = onAuthStateChanged(auth, user => {
      // Update state with user or null if logged out
      setUser(user);
    });
    // Cleanup (remove the listener when component unmounts)
    return unsubscribe;
  }, []);

  return (
    <BrowserRouter basename='/E-Commerce-Store/'>
      <div>
        {isLoading && (
          <div className='fixed top-0 left-0 w-full h-screen z-20 bg-white flex justify-center items-center'>
            <p>Loading . . .</p>
          </div>
        )}
        <Routes>
          {/* Routes with no navbar */}
          <Route path='/sign-up' element={<SignUp />}></Route>

          {/* Main layout routes (routes with navbar) */}
          <Route path='/' element={<MainLayout />}>
            <Route index element={<ProductList />}></Route>
            <Route path='/product/:id' element={<Product />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
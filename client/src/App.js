import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './components/cart/Cart';
import Navbar from './components/header/Navbar';
import Maincomp from './components/home/Maincomp';
import Newnav from './components/newnavbar/Newnav';
import Signin from './components/signup_signin/Signin';
import Signup from './components/signup_signin/Signup';


const App = () => {
  return (
    <>
      <Navbar />
      <Newnav />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Maincomp />}></Route>
          <Route path='/login2' element={<Signin />}></Route>
          <Route path='/register2' element={<Signup />}></Route>
          <Route path='/getproductsone/:id' element={<Cart />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
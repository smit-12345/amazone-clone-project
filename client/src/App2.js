import './App.css';
import Footer from './components/footer/Footer';
import Navbar from './components/header/Navbar';
import Maincomp from './components/home/Maincomp';
import Newnav from './components/newnavbar/Newnav';
import { Routes, Route } from "react-router-dom";
import Signin from './components/signup_signin/Signin';
import Signup from './components/signup_signin/Signup';
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';

function App() {
  return (
    <>
      <Navbar />
      <Newnav />

      <Routes>
        <Route path="/" element={<Maincomp />}> </Route>
        <Route path="/login2" element={<Signin />}> </Route>

        <Route path='/register2' element={<Signup />} />
        <Route path='/getproductsone/:id' element={<Cart />}></Route>
        <Route path='/buynow' element={<Buynow />}></Route>

      </Routes>

      <Footer />
    </>

  );
}

export default App;

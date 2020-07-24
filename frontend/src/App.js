import React from 'react';
import './App.css';
import data from "./data"
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import Signin from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';

function App() {
// debugger
  const openMenu=()=>{
    document.querySelector('.sidebar').classList.add('open');
  }
  const closeMenu=()=>{
    document.querySelector('.sidebar').classList.remove('open');
  }
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  return (
    <BrowserRouter>
    <div className="grid-container">
    <header className="header">
        <div className="brand">
            <button onClick={openMenu}>
                &#9776;
            </button>
            <Link to={'/'}>SHOES VV</Link>
        </div>
        <div className="header-links">
            <Link to="cart.html">Cart</Link>
            {userInfo? <Link to='/profile'> {userInfo.name} </Link>:
            <Link to="/signin">Sign In</Link>
          }     
        </div>
    </header>
    <aside className="sidebar">
        <h3>Brand Of Shoes</h3>
        <button className="sidebar-close-button" onClick={closeMenu}>x</button>
        <ul>
            <li>
                <a href="index.html">Nike</a>
            </li>

            <li>
                <a href="index.html">Reabok</a>
            </li>

        </ul>
    </aside>
    <main className="main">
        <div className="content">
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path="/products/" component={ProductsScreen} />
          <Route path='/signin' component={Signin} />
          <Route path="/register/" component={RegisterScreen} />
          <Route path='/shipping/' component={ShippingScreen}/>
          <Route path='/payment/' component={PaymentScreen} />
          <Route path='/placeorder/' component={PlaceOrderScreen}/>
          <Route path='/profile/' component={ProfileScreen} />
          <Route path='/' exact={true} component={HomeScreen} />
            
        </div>

    </main>
    <footer className="footer">
        All right reserved.
    </footer>
</div>
</BrowserRouter>
  );
}

export default App;

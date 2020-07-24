import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from './reducers/productReducers';
import {userSigninReducers, userRegisterReducers} from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers';
import {orderCreateReducer} from './reducers/orderReducers'
import Cookie from 'js-cookie';


const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;
const shipping = Cookie.getJSON('shipping') || null;

const initialState = { cart:{cartItems,shipping, payment:{}}, userSignin:{userInfo} };

const reducer = combineReducers({
    productList: productListReducer,
    productDetails:productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducers,
    userRegister: userRegisterReducers,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    order: orderCreateReducer,

});
const composeEnhancer =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
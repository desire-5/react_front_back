import Axios from "axios"
import { ADD_TO_CART, REMOOVE_FROM_CART, CART_SAVE_SHIPPNG, CART_SAVE_PAYMENT } from "../constants/cartConstants";
import Cookies from 'js-cookie';

const addToCart = (productId, qty) => async (dispatch, getState) => {
    try{
        // debugger
        const {data} = await Axios.get('/api/products/'+productId);
        dispatch({type:ADD_TO_CART, payload:{
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        }});
        const {cart:{cartItems}} = getState();
        Cookies.set('cartItems', JSON.stringify(cartItems));
    }catch(error){
        // dispatch({type:CART_FAIL, payload:error.message})
    }
} 

const removeFromCart = (productId)=>(dispatch, getState)=>{
    dispatch({type:REMOOVE_FROM_CART,payload:productId});
    const {cart:{cartItems}} = getState();
    Cookies.set('cartItems', JSON.stringify(cartItems));
}

const saveShipping = (data) => (dispatch, getState) =>{
    dispatch({type:CART_SAVE_SHIPPNG, payload:data});
    const {cart:{shipping}} = getState();
    Cookies.set('shipping', JSON.stringify(shipping));
}
const savePayment = (data) => (dispatch) =>{
    dispatch({type:CART_SAVE_PAYMENT, payload:data});
}
export {addToCart, removeFromCart, saveShipping, savePayment}
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';

const CartScreen = (props) => {
    // debugger
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]):'1'

    const dispatch = useDispatch();
    const state = useSelector(state => state.cart);
    const {cartItems} = state;
    useEffect(() => {
        if(productId)
            dispatch(addToCart(productId, qty));
        return () => {
            
        };
    }, []);
    const removeFromCartHandler = (productId)=>{
        // alert(productId);
        dispatch(removeFromCart(productId));
    }

    const checkoutHandler=()=>{
        props.history.push('/signin?redirect=shipping');
    }
    return <div className='cart'>
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3>Shopping Cart</h3>
                    <div><b>Price</b></div>
                </li>
                <li>
                {
                cartItems.length === 0 ?
                    <div>Cart is empty</div>
                    :
                    cartItems.map(x => 
                        <div>
                            <div className="cart-image">
                                <Link to={'product/' + x.product}>
                                    <img src={x.image} alt={x.name}/>
                                 </Link>
                            </div>
                            <div className="cart-name">
                                <div>{x.name}</div>
                                <div>
                                    Qty:
                                    <select value={x.qty} onChange={e=>dispatch(addToCart(x.product, e.target.value))}>
                                        {console.log('11',[...Array(x.countInStock).keys()])}
                                        {[...Array(x.countInStock).keys()].map(x=> 
                                            <option value={x+1}>{x+1}</option>)}
                                    </select>
                                    <button type='button' className='button primary' onClick={()=>removeFromCartHandler(x.product)}>remove</button>
                                </div>
                                <div className='cart-price'>${x.price}</div>
                            </div>
                        </div>)
                }
                </li>
            </ul>
        </div>
        <div className="cart-action">
                <h3>
                    Subtotal ({cartItems.reduce((a, c) => a+c.qty, 0)} items):
                    Price - ${cartItems.reduce((a,c)=> a + c.price * c.qty ,0)}
                </h3>
                

                <div>
                    <button onClick={checkoutHandler}className='button primary full-width' disabled={cartItems.length === 0}>Checkout out</button>
                </div>
        </div>
    </div>
}
export default CartScreen;
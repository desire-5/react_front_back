import { ADD_TO_CART, REMOOVE_FROM_CART, CART_SAVE_SHIPPNG, CART_SAVE_PAYMENT } from "../constants/cartConstants";

const cartReducer = (state = { cartItems: [], shipping: {}, payment: {}, loading:true }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            // debugger
            const item = action.payload;
            const product = state.cartItems.find(x => x.product === item.product);
            if(product){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === item.product?item:x)
                }
            }
            return {
                ...state,
                cartItems: [...state.cartItems, item]
            }

            case REMOOVE_FROM_CART:
                return {
                    ...state,
                    cartItems: state.cartItems.filter(x => x.product !== action.payload)
                }
            case CART_SAVE_SHIPPNG: 
            return {
                ...state,
                shipping: action.payload,
                loading:false
            }
            case CART_SAVE_PAYMENT:
                return {
                    ...state,
                    payment: action.payload
                }
        default:
            return state;
    }
}
export {cartReducer}
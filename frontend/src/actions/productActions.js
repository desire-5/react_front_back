import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, 
    PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, 
    PRODUCT_SAVE_FAIL, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_REQUEST,
    PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL
} from "../constants/productConstants"
import Axios from "axios";

//thunk
const listProducts = () => async(dispatch) => {
    try{
        // debugger
        dispatch({type:PRODUCT_LIST_REQUEST});
        const {data} = await Axios.get('/api/products/');
        dispatch({type:PRODUCT_LIST_SUCCESS, payload:data});    
    }catch(error){
        dispatch({type:PRODUCT_LIST_FAIL, payload:error.message});  
    }
}
const detailsProduct = (productId) => async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAIL_REQUEST,payload:productId})
        const {data} = await Axios.get('/api/products/'+ productId);
        dispatch({type:PRODUCT_DETAIL_SUCCESS, payload:data});
    }catch(error){
        dispatch({type:PRODUCT_DETAIL_FAIL, payload:error.message});
    }
}

const saveProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({type:PRODUCT_SAVE_REQUEST, payload:product});
        const {userSignin: {userInfo}} = getState();
       if(!product._id){
        const {data} = Axios.post('/api/products/', product, {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        });
        dispatch({type: PRODUCT_SAVE_SUCCESS, payload:data});
       }else{
        const {data} = Axios.put('/api/products/' + product._id, product, {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        });
         dispatch({type: PRODUCT_SAVE_SUCCESS, payload:data});
       }
       
    } catch (error) {
        dispatch({type: PRODUCT_SAVE_FAIL, payload:error.message});
    }
}

const deleteProduct=(productId) => async (dispatch, useState) => {
    try {
        const {userSignin: {userInfo}} = useState();

        dispatch({type:PRODUCT_DELETE_REQUEST, payload:productId});
        const {data} = await Axios.delete('/api/products/' + productId, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        } );
        dispatch({type:PRODUCT_DELETE_SUCCESS, payload:data, success:true})
    } catch (error) {
        dispatch({type:PRODUCT_DELETE_FAIL, payload:error.message})
    }
    
}
export {listProducts, detailsProduct, saveProduct, deleteProduct}
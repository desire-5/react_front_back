import React, { useState } from 'react'
import data from '../data'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import {detailsProduct} from '../actions/productActions'

const ProductScreen = (props)=>{
// debugger

const [qty, setQty] = useState(1);
const productDetails = useSelector(state=>state.productDetails);
const{loading, product, error} = productDetails;
const dispatch = useDispatch();

useEffect(() => {
  dispatch(detailsProduct(props.match.params.id))
  return () => {

  }
}, [])
const hanleAddToCart = () =>{
  props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
}
    // const product = data.products.find(item => item._id === props.match.params.id)
    return <div>
        <div className="back-to-result">
            <Link to="/">Back to result</Link>
        </div>
    {loading? <div>Loadding...</div>:
      error? <div>{error}</div>:
    <div className="details">
            <div className="details-image">
              <img src={product.image} alt="product"></img>
            </div>
            <div className="details-info">
              <ul>
                <li>
                  <h4>{product.name}</h4>
                </li>
                <li>
                  {product.rating} Stars ({product.numReviews})
                </li>
                <li>
                  Price: <b>${product.price}</b>
                </li>

                <li>
                  Description:
                  <div>{product.description}</div>
                </li>
              </ul>
            </div>
            <div className='details-action'>
                <ul>
                <li>
                  Price: <b>${product.price}</b>
                </li>
                <li>
                  Status: <b>{product.countInStock >0 ?'In Stock': 'Out Of Stock' }</b>
                </li>
                <li> 
                  Qty: <select value={qty} onChange={(e)=>setQty(e.target.value)}>
                      {[...Array(product.countInStock).keys()].map(item => 
                        <option value={item +1} key={item +1}>{item +1}</option>
                      )}
                  </select>
                </li>
                <li>
                {product.countInStock > 0 ? <button className='button primary' onClick={hanleAddToCart}>Add to cart</button>
                 : <div>Out Of Stock</div>
                }
                    
                </li>
                </ul>
            </div>
            </div>
  }
        
            
        </div>
}
export default ProductScreen;
import React, { useState, useEffect } from 'react'
// import data from '../data'
import {Link} from "react-router-dom";
// import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

const HomeScreen = (props)=>{
    // const [products, setProducts] = useState([]);
    const productList = useSelector(state=> state.productList)
    const {products, loading, error} = productList;
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(listProducts());
        // debugger
        // const fetchData = async () => {
        //     const data = await axios.get("/api/products");
        //         setProducts(data);           
        // }
        // fetchData();
        return () => {
            
        };
    }, []);
 
    return loading ? <div>Loading...</div> :
            error? <div>{error}</div> :
        <ul className="products">
    {
      products.map(item =>
      <li key={item._id}>
        <div className="product">
            <Link to={"/product/"+item._id}><img className="product-image" src={item.image} alt="product" /></Link>
            
            <div className="product-name">
               <Link to={"/product/"+item._id}>{item.name}</Link>
            </div>
              <div className="product-brand">{item.brand}</div>
              <div className="product-price">${item.price}</div>
              <div className="product-rating">{item.rating} Stars ({item.numReviews} Reviews)</div>
        </div>
      </li>)
    }
</ul>
}
export default HomeScreen;
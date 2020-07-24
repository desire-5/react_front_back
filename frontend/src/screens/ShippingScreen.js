import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../component/CheckoutSteps';

const ShippingScreen=(props) => {

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');


  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, phone,  city, postalCode, country }));
    props.history.push('payment');
  }

  return <div>
    <CheckoutSteps step1 step2 ></CheckoutSteps>
    <div className="form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>Shipping</h2>
          </li>

          <li>
            <label htmlFor="address">
              Address
          </label>
            <input type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="phone" > Phone </label>
            <input type="tel" id="phone" name="phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              required onChange={e=>setPhone(e.target.value)}/>
              <small>Format: 123-456-7890</small>
          </li>
          <li>
            <label htmlFor="city">
              City
          </label>
            <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="postalCode">
              Postal Code
          </label>
            <input type="text" name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="country">
              Country
          </label>
            <input type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)}>
            </input>
          </li>
          <li>
            <button type="submit" className="button primary">Continue</button>
          </li>

        </ul>
      </form>
    </div>
  </div>
}
export default ShippingScreen;
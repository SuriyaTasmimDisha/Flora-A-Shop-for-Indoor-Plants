import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../Store/Actions/CartActions';
import CheckOutSteps from '../../Components/CheckOutSteps';

export default function Payment(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('Bkash');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder');
  };
  return (
    <div>
      <CheckOutSteps step1 step2 step3></CheckOutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="bkash"
              value="bkash"
              name="paymentMethod"
              checked
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="bkash">Bkash</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="onDelivery"
              value="Cash On Delivery"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="onDelivery">Cash on Delivery</label>
          </div>
        </div>
        <div>
          <label />
          <button type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
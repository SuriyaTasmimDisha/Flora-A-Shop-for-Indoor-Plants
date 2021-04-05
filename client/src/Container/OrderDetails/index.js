import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../../Components/LoadingBox';
import MessageBox from '../../Components/MessageBox';
import { detailsOrder } from '../../Store/Actions/OrderActions';

export default function OrderDetails(props) {
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);

  return (
    loading ? (<LoadingBox></LoadingBox>) :
    error ? (<MessageBox variant='danger'>{error}</MessageBox>)
    :(
    <div>
      <h1>Order: {order._id}</h1>
      <div className="row center">
        <div >
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> 
                    {order.shippingAddress.address},
                    {order.shippingAddress.city}, 
                    {order.shippingAddress.postalCode}
                   ,{order.shippingAddress.country}
                </p>
                {order.isPaid ? (
                  <MessageBox variant='success'>
                    Deliveret at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant='danger'>
                    Not Paid
                  </MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              {order.isPaid ? (
                  <MessageBox variant='success'>
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant='danger'>
                    Not Paid
                  </MessageBox>
                )}
                <h2>Order status: </h2>
                <p>{order.status}</p>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.productId}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/catalogue/${item.productId}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ));
}
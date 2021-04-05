import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../../Components/LoadingBox';
import MessageBox from '../../Components/MessageBox';
import { ORDER_STATUS_UPDATE_RESET } from '../../Constants/OrderConstants';
import { detailsOrder, updateOrderStatus } from '../../Store/Actions/OrderActions';

export default function OrderDetails(props) {
  const orderId = props.match.params.id;
  const [status, setOrderStatus] = useState('');
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderStatusUpdate = useSelector((state) => state.orderStatusUpdate);
  const {
    loading: loadingStatusUpdate,
    error: errorStatusUpdate,
    success: successStatusUpdate,
  } = orderStatusUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successStatusUpdate) {
      props.history.push('/orderlist');
    }
    if(!order || order._id !== orderId || successStatusUpdate){
      dispatch({ type: ORDER_STATUS_UPDATE_RESET });
      dispatch(detailsOrder(orderId));
    } else{
      setOrderStatus(order.status);
    }
  }, [order, dispatch, orderId, successStatusUpdate, props.history]);

  const orderStatusHandler = (e) => {
    e.preventDefault();
    dispatch(updateOrderStatus({_id: orderId, status}));
  };

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
              <li>
              <label> Order Status: {order.status} </label>
              {(userInfo.role === 'super admin' || userInfo.role === 'admin') && (
                <>
                  <select
                    name='orderStatus'
                    id='orderStatus'
                    onChange={(e) => setOrderStatus(e.target.value)}
                  >
                  <option value='Pending'>Pending</option>  
                  <option value='Accepted'>Accepted</option>  
                  <option value='Delivered'>Delivered</option>
                  </select>
                  <button 
                  type="submit"
                  onClick={orderStatusHandler}
                  >
                  Update Order Status
                 </button>
                </>
              )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ));
}